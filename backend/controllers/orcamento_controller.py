from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from typing import Optional
from sqlalchemy.orm import Session
from db.session import get_db
from schemas.orcamento_schema import OrcamentoSchema, OrcamentoUpdateSchema, TipoOrcamento
from schemas.user_schemas import UserJWT
from services.orcamento_service import *
from middleware.auth_middleware import role_required
import decimal

router = APIRouter(prefix="/orcamentos", tags=["Orcamentos"])

# Inserir um orçamento
@router.post("/inserir")
async def inserir_orcamento(
        id_entidade_externa: int = Form(...),
        valor_orcamento : decimal.Decimal = Form(...),
        descricao_orcamento: str = Form(...),
        pdforcamento: UploadFile = File(...),
        idprocesso: int = Form(...),
        tipoorcamento: TipoOrcamento = Form(...),
        db: Session = Depends(get_db),
        token: UserJWT = Depends(role_required(["admin", "gestor"]))):
    try:
        orcamento_data = OrcamentoSchema(IDEntidade=id_entidade_externa ,DescOrcamento=descricao_orcamento, Valor=valor_orcamento, NomePDF=pdforcamento.filename, IDProcesso = idprocesso, TipoProcesso=tipoorcamento)
        sucesso, msg = await inserir_orcamento_service(db, orcamento_data, pdforcamento)

        if sucesso:
            return {"message": "Orçamento inserido com sucesso"}
        else:
            raise HTTPException(status_code=400, detail=msg)
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Endpoint para ver os orçamentos registados
@router.get("/listar/")
async def ver_orcamentos(db: Session = Depends(get_db), token: UserJWT = Depends(role_required(["admin", "gestor"]))):
    try:
        return await listar_orcamentos_service(db)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Endpoint para eliminar um orçamento
@router.delete("/eliminar/{id_orcamento}")
async def eliminar_orcamento(
        id_orcamento: int,
        db: Session = Depends(get_db),
        token: UserJWT = Depends(role_required(["admin", "gestor"]))):
    try:
        return await eliminar_orcamento_service(db,id_orcamento)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Endpoint para alterar um orçamento
@router.put("/alterar/")
async def alterar_orcamento(
        orcamento_id: int = Form(...),
        id_entidade: int = Form(...),
        valor_orcamento: decimal.Decimal = Form(...),
        descricao_orcamento: str = Form(...),
        pdforcamento: Optional[UploadFile] = File(...),
        db: Session = Depends(get_db),
        token: UserJWT = Depends(role_required(["admin", "gestor"]))):
    try:
        orcamento = OrcamentoUpdateSchema(OrcamentoID=orcamento_id,IDEntidade=id_entidade,DescOrcamento=descricao_orcamento, Valor=valor_orcamento)
        return await alterar_orcamento_service(db, orcamento, pdforcamento)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))