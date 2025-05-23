from fastapi import UploadFile, HTTPException
from requests import Session
from sqlalchemy.orm import joinedload
from db.models import PedidoNovoRecurso, PedidoManutencao, RecursoComun, EstadoPedidoManutencao, EstadoManutencao, \
    Manutencao, EntidadeExterna
from sqlalchemy.exc import SQLAlchemyError
import db.session as session
from schemas.recurso_comum_schema import *
from sqlalchemy import select, exists

#region Gestão de Recursos Comuns

#Inserção de um novo recurso comum
async def inserir_recurso_comum_db(db:session, recurso_comum:RecursoComumSchemaCreate):
    try:
        novo_recurso_comum = RecursoComun(Nome=recurso_comum.Nome, DescRecursoComum=recurso_comum.DescRecursoComum, Path="none")
        db.add(novo_recurso_comum)
        db.commit()
        return novo_recurso_comum
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

#Faz o update dos dados de um recurso comum
async def update_recurso_comum_db(recurso_comum_id: int ,recurso_comum_update : RecursoComunUpdate,db:session):
    try:
        recurso = db.query(RecursoComun).filter(RecursoComun.RecComumID == recurso_comum_id).first()

        if not recurso:
            raise HTTPException(status_code=404, detail="Recurso Comum não encontrado")

        for key,value in recurso_comum_update.dict(exclude_unset=True).items():
            setattr(recurso, key, value)

        db.commit()
        db.refresh(recurso)

        return recurso
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

#Elimina um recurso comum
async def eliminar_recurso_comum_db(recurso_comum_id: int, db:session):
    try:
        recurso_comum = db.query(RecursoComun).filter(RecursoComun.RecComumID == recurso_comum_id).first()
        
        if not recurso_comum:
            raise HTTPException(status_code=404, detail="Recurso Comum não encontrado")
            
        db.delete(recurso_comum)
        db.commit()
        # Remover a linha de refresh aqui, pois não é necessária após a exclusão

        return {'Recurso Eliminado com sucesso!'}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

#Verifica a possibilidade de eliminar um recurso comum
async def verifica_eliminar_recurso_comum_db(recurso_comum_id: int, db: session) -> bool:
    try:
        # Removendo o await da chamada execute()
        pedido = db.execute(
            select(PedidoManutencao).where(
                PedidoManutencao.RecComumID == recurso_comum_id,
                PedidoManutencao.EstadoPedManuID.in_([
                    EstadoPedManutencaoSchema.NEGOCIACAOENTIDADESEXTERNAS.value,
                    EstadoPedManutencaoSchema.VOTACAO.value
                ])
            )
        )
        pedido_resultado = pedido.scalars().first()

        return pedido_resultado is None

    except SQLAlchemyError as e:
        # Removendo o await da chamada rollback()
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

#endregion

#region Pedidos de Novos Recursos Comuns

#Inserção de um novo pedido de um novo recurso comum
async def inserir_pedido_novo_recurso_db(db:session, pedido:PedidoNovoRecursoSchemaCreate):
    try:
        novo_pedido = PedidoNovoRecurso(
            DescPedidoNovoRecurso = pedido.DescPedidoNovoRecurso,
            DataPedido = pedido.DataPedido,
            UtilizadorID = pedido.UtilizadorID,
            EstadoPedNovoRecID = pedido.EstadoPedNovoRecID
        )
        db.add(novo_pedido)
        db.commit()
        db.refresh(novo_pedido)

        return {'Pedido de novo recurso inserido com sucesso!'}, novo_pedido
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

#Altera estado do pedido de novo recurso comum
async def altera_estado_pedido_novo_recurso_db(db:session, id_pedido: int, novo_estado : int):
    try:
        pedido = db.query(PedidoNovoRecurso).filter(PedidoNovoRecurso.PedidoNovoRecID == id_pedido).first()

        pedido.EstadoPedNovoRecID = novo_estado

        db.commit()
        db.refresh(pedido)
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async  def update_imagem(db:session, path: str, id:int):
    try:
        recurso_comum = db.query(RecursoComun).filter(RecursoComun.RecComumID == id).first()

        if recurso_comum:
            recurso_comum.Path = path
            db.commit()
            return True
        else:
            raise HTTPException(status_code=400,detail="ID do recurso invalido!")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def obter_recrusos_comuns(db:session):
    try:
        return db.query(RecursoComun).all()
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def obter_recrusos_comuns_by_id(db:session, id:int):
    try:
        return db.query(RecursoComun).filter(RecursoComun.RecComumID == id).first()
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def listar_pedidos_novos_recursos_db(db:session):
    try:
        pedidos_novos_recursos = (
            db.query(PedidoNovoRecurso)
            .options(
                joinedload(PedidoNovoRecurso.Utilizador_),
                joinedload(PedidoNovoRecurso.EstadoPedidoNovoRecurso_)
            )
            .all()
        )
        return pedidos_novos_recursos

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def obter_pedido_novo_recurso_db(db:session, id_pedido: int):
    try:
        pedido_novo_recurso = db.query(PedidoNovoRecurso).filter(PedidoNovoRecurso.PedidoNovoRecID == id_pedido).first()
        return pedido_novo_recurso
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

#endregion

#region Pedidos de Manutenção

#Inserção de um pedido de manutenção de um recurso comum
async def inserir_pedido_manutencao_db(db:session, pedido:PedidoManutencaoSchemaCreate):
    try:
        novo_pedido = PedidoManutencao(DescPedido=pedido.DescPedido, DataPedido=pedido.DataPedido, RecComumID=pedido.RecComumID, UtilizadorID=pedido.UtilizadorID, EstadoPedManuID=pedido.EstadoPedManuID)
        db.add(novo_pedido)
        db.commit()
        db.refresh(novo_pedido)

        return {'Pedido de manutenção inserido com sucesso!'}, novo_pedido
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def listar_pedidos_manutencao_db(db:session):

    try:
        pedidos_manutencao = (
            db.query(PedidoManutencao)
            .options(
                joinedload(PedidoManutencao.Utilizador_),
                joinedload(PedidoManutencao.EstadoPedidoManutencao_),
                joinedload(PedidoManutencao.RecursoComun_)
            )
            .all()
        )

        return pedidos_manutencao

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def obter_all_tipo_estado_pedido_manutencao(db:session):
    try:
        dbc = db.query(EstadoPedidoManutencao).all()
        if dbc is None:
            return None
        return dbc
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def alterar_estado_pedido_manutencao(db:session, id_pedido_manutencao:int, estado_pedido_manutencao:int):
    try:
        pedido_manutencao = db.query(PedidoManutencao).filter(PedidoManutencao.PMID == id_pedido_manutencao).first()
        pedido_manutencao.EstadoPedManuID = estado_pedido_manutencao
        db.commit()
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def obter_pedido_manutencao_db(db:session, id_manutencao:int):
    try:
        pedido_manutencao = db.query(PedidoManutencao).filter(PedidoManutencao.PMID == id_manutencao).first()
        return pedido_manutencao
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def update_pedido_manutencao_db(db:session, u_pedido: PedidoManutencaoUpdateSchema):
    try:
        pedido = db.query(PedidoManutencao).filter(PedidoManutencao.PMID == u_pedido.PMID).first()
        pedido.DescPedido = u_pedido.DescPedido
        db.commit()
        return pedido
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def eliminar_pedido_manutencao(db:session, pedido_id:int):
    try:
        pedido_manutencao = db.query(PedidoManutencao).filter(PedidoManutencao.PMID == pedido_id).first()
        db.delete(pedido_manutencao)
        db.commit()
        return {'Pedido de manutenção eliminado com sucesso!'}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

#endregion

#region Manutenção de Recursos Comuns

async def criar_manutencao_db(db:session, manutencao:ManutencaoCreateSchema):
    try:
        nova_manutencao = Manutencao(
            PMID=manutencao.PMID,
            DataManutencao=manutencao.DataManutencao,
            DescManutencao=manutencao.DescManutencao,
            EstadoManuID=1,
            OrcamentoOrcamentoID= manutencao.Orcamento_id,
        )

        db.add(nova_manutencao)
        db.commit()

        return {'Nova manutenção adicionada com sucesso !'}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def obter_all_tipo_estado_manutencao(db:session):
    try:
        dbc = db.query(EstadoManutencao).all()
        if dbc is None:
            return None
        return dbc
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def alterar_estado_manutencao(db:session, id_manutencao:int, tipo_estado_manutencao:int):
    try:
        manutencao = db.query(Manutencao).filter(Manutencao.ManutencaoID == id_manutencao).first()
        manutencao.EstadoManuID = int(tipo_estado_manutencao)
        db.commit()
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def obter_manutencao_db(db:session, id_manutencao:int):
    try:
        manutencao = db.query(Manutencao).filter(Manutencao.ManutencaoID == id_manutencao).first()
        return manutencao
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def listar_manutencoes_db(db:session):
    try:
        manutencoes = db.query(Manutencao).all()
        return manutencoes
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def update_manutencao_db(db:session, u_manutencao: ManutencaoUpdateSchema):
   try:
        manutencao = db.query(Manutencao).filter(Manutencao.ManutencaoID == u_manutencao.ManutencaoID).first()
        manutencao.PMID = u_manutencao.PMID
        manutencao.DataManutencao = u_manutencao.DataManutencao
        manutencao.DescManutencao = u_manutencao.DescManutencao

        db.commit()
        return manutencao
   except SQLAlchemyError as e:
       db.rollback()
       raise HTTPException(status_code=400, detail=str(e))

#Eliminar uma manutenção da base de dados
async def eliminar_manutencao_db(db:session, id_manutencao:int):
    try:
        manutencao = db.query(Manutencao).filter(Manutencao.ManutencaoID == id_manutencao).first()
        db.delete(manutencao)
        db.commit()

        return {'Manutenção eliminada com sucesso!'}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
#endregion

#Metedos APENAS para testes
async def inserir_pedido_novo_recurso_teste(db:session, pedido:PedidoNovoRecurso):
    try:
        db.add(pedido)
        db.commit()
        db.refresh(pedido)

        return pedido
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

#Metedos APENAS para testes
async def inserir_pedido_manutencao_test(db:session, pedido:PedidoManutencao):
    try:
        db.add(pedido)
        db.commit()
        db.refresh(pedido)

        return pedido
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

async def inserir_recurso_comum_teste(db:session, recurso_comum:RecursoComun):
    try:
        db.add(recurso_comum)
        db.commit()
        return recurso_comum
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
