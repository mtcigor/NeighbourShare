from typing import List, Optional

from sqlalchemy import Boolean, Column, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, PrimaryKeyConstraint, String, TEXT, Table
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime
import decimal

class Base(DeclarativeBase):
    pass


class Categoria(Base):
    __tablename__ = 'Categoria'
    __table_args__ = (
        PrimaryKeyConstraint('CatID', name='PK__Categori__6A1C8ADABF257CED'),
    )

    CatID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DescCategoria: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))

    Recurso: Mapped[List['Recurso']] = relationship('Recurso', back_populates='Categoria_')


class Disponibilidade(Base):
    __tablename__ = 'Disponibilidade'
    __table_args__ = (
        PrimaryKeyConstraint('DispID', name='PK__Disponib__1682E811C692DC07'),
    )

    DispID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DescDisponibilidade: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))

    Recurso: Mapped[List['Recurso']] = relationship('Recurso', back_populates='Disponibilidade_')


class EntidadeExterna(Base):
    __tablename__ = 'EntidadeExterna'
    __table_args__ = (
        PrimaryKeyConstraint('EntidadeID', name='PK__Entidade__6894D27573B929B4'),
    )

    EntidadeID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Especialidade: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    Contacto: Mapped[int] = mapped_column(Integer)
    Email: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    Nome: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    Nif: Mapped[Optional[int]] = mapped_column(Integer)

    Orcamento: Mapped[List['Orcamento']] = relationship('Orcamento', back_populates='EntidadeExterna_')


class EstadoManutencao(Base):
    __tablename__ = 'EstadoManutencao'
    __table_args__ = (
        PrimaryKeyConstraint('EstadoManuID', name='PK__EstadoMa__6A784FD44E63FB74'),
    )

    EstadoManuID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DescEstadoManutencao: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))

    Manutencao: Mapped[List['Manutencao']] = relationship('Manutencao', back_populates='EstadoManutencao_')


class EstadoPedidoManutencao(Base):
    __tablename__ = 'EstadoPedidoManutencao'
    __table_args__ = (
        PrimaryKeyConstraint('EstadoPedManuID', name='PK__EstadoPe__0010CC67FDF310E8'),
    )

    EstadoPedManuID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DescEstadoPedidoManutencao: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))

    PedidoManutencao: Mapped[List['PedidoManutencao']] = relationship('PedidoManutencao', back_populates='EstadoPedidoManutencao_')


class EstadoPedidoNovoRecurso(Base):
    __tablename__ = 'EstadoPedidoNovoRecurso'
    __table_args__ = (
        PrimaryKeyConstraint('EstadoPedNovoRecID', name='PK__EstadoPe__4A23F6216999A430'),
    )

    EstadoPedNovoRecID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DescEstadoPedidoNovoRecurso: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))

    PedidoNovoRecurso: Mapped[List['PedidoNovoRecurso']] = relationship('PedidoNovoRecurso', back_populates='EstadoPedidoNovoRecurso_')


class EstadoPedidoReserva(Base):
    __tablename__ = 'EstadoPedidoReserva'
    __table_args__ = (
        PrimaryKeyConstraint('EstadoID', name='PK__EstadoPe__FEF86B60DEBD64FF'),
    )

    EstadoID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DescEstadoPedidoReserva: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))

    PedidoReserva: Mapped[List['PedidoReserva']] = relationship('PedidoReserva', back_populates='EstadoPedidoReserva_')


class RecursoComun(Base):
    __tablename__ = 'RecursoComun'
    __table_args__ = (
        PrimaryKeyConstraint('RecComumID', name='PK__RecursoC__0691E1D6A307E2C4'),
    )

    RecComumID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Nome: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    DescRecursoComum: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    Path: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))

    PedidoManutencao: Mapped[List['PedidoManutencao']] = relationship('PedidoManutencao', back_populates='RecursoComun_')


class TipoProcesso(Base):
    __tablename__ = 'TipoProcesso'
    __table_args__ = (
        PrimaryKeyConstraint('TipoProcID', name='PK__TipoProc__D86DF0CCC213021C'),
    )

    TipoProcID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DescTipoProcesso: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))

    Notificacao: Mapped[List['Notificacao']] = relationship('Notificacao', back_populates='TipoProcesso_')


class TipoUtilizador(Base):
    __tablename__ = 'TipoUtilizador'
    __table_args__ = (
        PrimaryKeyConstraint('TUID', name='PK__TipoUtil__81338C4E751402E1'),
    )

    TUID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DescTU: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))

    Utilizador: Mapped[List['Utilizador']] = relationship('Utilizador', back_populates='TipoUtilizador_')


class Votacao(Base):
    __tablename__ = 'Votacao'
    __table_args__ = (
        PrimaryKeyConstraint('VotacaoID', name='PK__Votacao__F4DCDDBD2B9F7B29'),
    )

    VotacaoID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Titulo: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    Descricao: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    DataInicio: Mapped[datetime.date] = mapped_column(Date)
    DataFim: Mapped[datetime.date] = mapped_column(Date)
    Processada: Mapped[bool] = mapped_column(Boolean)

    PedidoManutencao: Mapped[List['PedidoManutencao']] = relationship('PedidoManutencao', back_populates='Votacao_')
    Voto: Mapped[List['Voto']] = relationship('Voto', back_populates='Votacao_')
    Votacao_PedidoNovoRecurso: Mapped[List['VotacaoPedidoNovoRecurso']] = relationship('VotacaoPedidoNovoRecurso', back_populates='Votacao_')


class Notificacao(Base):
    __tablename__ = 'Notificacao'
    __table_args__ = (
        ForeignKeyConstraint(['TipoProcID'], ['TipoProcesso.TipoProcID'], name='FKNotificaca853595'),
        PrimaryKeyConstraint('NotificacaoID', name='PK__Notifica__FB9B785C88194266')
    )

    NotificacaoID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Titulo: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    Mensagem: Mapped[str] = mapped_column(TEXT(2147483647, 'SQL_Latin1_General_CP1_CI_AS'))
    DataHora: Mapped[datetime.datetime] = mapped_column(DateTime)
    ProcessoID: Mapped[int] = mapped_column(Integer)
    Estado: Mapped[bool] = mapped_column(Boolean)
    TipoProcID: Mapped[int] = mapped_column(Integer)

    TipoProcesso_: Mapped['TipoProcesso'] = relationship('TipoProcesso', back_populates='Notificacao')
    Utilizador: Mapped[List['Utilizador']] = relationship('Utilizador', secondary='NotificacaoUser', back_populates='Notificacao_')


class Orcamento(Base):
    __tablename__ = 'Orcamento'
    __table_args__ = (
        ForeignKeyConstraint(['EntidadeExternaEntidadeID'], ['EntidadeExterna.EntidadeID'], name='FKOrcamento228170'),
        PrimaryKeyConstraint('OrcamentoID', name='PK__Orcament__4E96F759F608A7CF')
    )

    OrcamentoID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Valor: Mapped[decimal.Decimal] = mapped_column(DECIMAL(19, 0))
    DescOrcamento: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    EntidadeExternaEntidadeID: Mapped[int] = mapped_column(Integer)
    NomePDF: Mapped[Optional[str]] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))

    EntidadeExterna_: Mapped['EntidadeExterna'] = relationship('EntidadeExterna', back_populates='Orcamento')
    PedidoManutencao: Mapped[List['PedidoManutencao']] = relationship('PedidoManutencao', secondary='OrcamentoPedidoManutencao', back_populates='Orcamento_')
    PedidoNovoRecurso: Mapped[List['PedidoNovoRecurso']] = relationship('PedidoNovoRecurso', secondary='OrcamentoPedidoNovoRecurso', back_populates='Orcamento_')
    Manutencao: Mapped[List['Manutencao']] = relationship('Manutencao', back_populates='Orcamento_')


class Utilizador(Base):
    __tablename__ = 'Utilizador'
    __table_args__ = (
        ForeignKeyConstraint(['TUID'], ['TipoUtilizador.TUID'], name='FKUtilizador842840'),
        PrimaryKeyConstraint('UtilizadorID', name='PK__Utilizad__90F8E1C85B39B119'),
        Index('UQ__Utilizad__A9D105342DA34580', 'Email', unique=True)
    )

    UtilizadorID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    NomeUtilizador: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    DataNasc: Mapped[datetime.date] = mapped_column(Date)
    Contacto: Mapped[int] = mapped_column(Integer)
    Email: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    PasswordHash: Mapped[str] = mapped_column(String(64, 'SQL_Latin1_General_CP1_CI_AS'))
    Salt: Mapped[str] = mapped_column(String(32, 'SQL_Latin1_General_CP1_CI_AS'))
    Verificado: Mapped[bool] = mapped_column(Boolean)
    Path: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    TUID: Mapped[int] = mapped_column(Integer)

    Notificacao_: Mapped[List['Notificacao']] = relationship('Notificacao', secondary='NotificacaoUser', back_populates='Utilizador')
    TipoUtilizador_: Mapped['TipoUtilizador'] = relationship('TipoUtilizador', back_populates='Utilizador')
    PedidoManutencao: Mapped[List['PedidoManutencao']] = relationship('PedidoManutencao', back_populates='Utilizador_')
    PedidoNovoRecurso: Mapped[List['PedidoNovoRecurso']] = relationship('PedidoNovoRecurso', back_populates='Utilizador_')
    Recurso: Mapped[List['Recurso']] = relationship('Recurso', back_populates='Utilizador_')
    Voto: Mapped[List['Voto']] = relationship('Voto', back_populates='Utilizador_')
    PedidoReserva: Mapped[List['PedidoReserva']] = relationship('PedidoReserva', back_populates='Utilizador_')


t_NotificacaoUser = Table(
    'NotificacaoUser', Base.metadata,
    Column('NotificacaoID', Integer, primary_key=True, nullable=False),
    Column('UtilizadorID', Integer, primary_key=True, nullable=False),
    ForeignKeyConstraint(['NotificacaoID'], ['Notificacao.NotificacaoID'], name='FKNotificaca868180'),
    ForeignKeyConstraint(['UtilizadorID'], ['Utilizador.UtilizadorID'], name='FKNotificaca496296'),
    PrimaryKeyConstraint('NotificacaoID', 'UtilizadorID', name='PK__Notifica__6294F640BD244B23')
)


class PedidoManutencao(Base):
    __tablename__ = 'PedidoManutencao'
    __table_args__ = (
        ForeignKeyConstraint(['EstadoPedManuID'], ['EstadoPedidoManutencao.EstadoPedManuID'], name='FKPedidoManu183438'),
        ForeignKeyConstraint(['RecComumID'], ['RecursoComun.RecComumID'], name='FKPedidoManu235529'),
        ForeignKeyConstraint(['UtilizadorID'], ['Utilizador.UtilizadorID'], name='FKPedidoManu652837'),
        ForeignKeyConstraint(['VotacaoID'], ['Votacao.VotacaoID'], name='FKPedidoManu749443'),
        PrimaryKeyConstraint('PMID', name='PK__PedidoMa__5C86FF66BED1664E')
    )

    PMID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DescPedido: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    DataPedido: Mapped[datetime.date] = mapped_column(Date)
    RecComumID: Mapped[int] = mapped_column(Integer)
    UtilizadorID: Mapped[int] = mapped_column(Integer)
    EstadoPedManuID: Mapped[int] = mapped_column(Integer)
    VotacaoID: Mapped[Optional[int]] = mapped_column(Integer)

    Orcamento_: Mapped[List['Orcamento']] = relationship('Orcamento', secondary='OrcamentoPedidoManutencao', back_populates='PedidoManutencao')
    EstadoPedidoManutencao_: Mapped['EstadoPedidoManutencao'] = relationship('EstadoPedidoManutencao', back_populates='PedidoManutencao')
    RecursoComun_: Mapped['RecursoComun'] = relationship('RecursoComun', back_populates='PedidoManutencao')
    Utilizador_: Mapped['Utilizador'] = relationship('Utilizador', back_populates='PedidoManutencao')
    Votacao_: Mapped[Optional['Votacao']] = relationship('Votacao', back_populates='PedidoManutencao')
    Manutencao: Mapped[List['Manutencao']] = relationship('Manutencao', back_populates='PedidoManutencao_')


class PedidoNovoRecurso(Base):
    __tablename__ = 'PedidoNovoRecurso'
    __table_args__ = (
        ForeignKeyConstraint(['EstadoPedNovoRecID'], ['EstadoPedidoNovoRecurso.EstadoPedNovoRecID'], name='FKPedidoNovo687404'),
        ForeignKeyConstraint(['UtilizadorID'], ['Utilizador.UtilizadorID'], name='FKPedidoNovo924624'),
        PrimaryKeyConstraint('PedidoNovoRecID', name='PK__PedidoNo__0649490B63FBEE09')
    )

    PedidoNovoRecID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DescPedidoNovoRecurso: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    DataPedido: Mapped[datetime.date] = mapped_column(Date)
    UtilizadorID: Mapped[int] = mapped_column(Integer)
    EstadoPedNovoRecID: Mapped[int] = mapped_column(Integer)

    Orcamento_: Mapped[List['Orcamento']] = relationship('Orcamento', secondary='OrcamentoPedidoNovoRecurso', back_populates='PedidoNovoRecurso')
    EstadoPedidoNovoRecurso_: Mapped['EstadoPedidoNovoRecurso'] = relationship('EstadoPedidoNovoRecurso', back_populates='PedidoNovoRecurso')
    Utilizador_: Mapped['Utilizador'] = relationship('Utilizador', back_populates='PedidoNovoRecurso')
    Votacao_PedidoNovoRecurso: Mapped[List['VotacaoPedidoNovoRecurso']] = relationship('VotacaoPedidoNovoRecurso', back_populates='PedidoNovoRecurso_')


class Recurso(Base):
    __tablename__ = 'Recurso'
    __table_args__ = (
        ForeignKeyConstraint(['CatID'], ['Categoria.CatID'], name='FKRecurso936704'),
        ForeignKeyConstraint(['DispID'], ['Disponibilidade.DispID'], name='FKRecurso462257'),
        ForeignKeyConstraint(['UtilizadorID'], ['Utilizador.UtilizadorID'], name='FKRecurso905396'),
        PrimaryKeyConstraint('RecursoID', name='PK__Recurso__82F2B1A4B24BDA5E')
    )

    RecursoID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    Nome: Mapped[str] = mapped_column(String(50, 'SQL_Latin1_General_CP1_CI_AS'))
    DescRecurso: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    Caucao: Mapped[decimal.Decimal] = mapped_column(DECIMAL(19, 0))
    Path: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    UtilizadorID: Mapped[int] = mapped_column(Integer)
    DispID: Mapped[int] = mapped_column(Integer)
    CatID: Mapped[int] = mapped_column(Integer)

    Categoria_: Mapped['Categoria'] = relationship('Categoria', back_populates='Recurso')
    Disponibilidade_: Mapped['Disponibilidade'] = relationship('Disponibilidade', back_populates='Recurso')
    Utilizador_: Mapped['Utilizador'] = relationship('Utilizador', back_populates='Recurso')
    PedidoReserva: Mapped[List['PedidoReserva']] = relationship('PedidoReserva', back_populates='Recurso_')


class Voto(Base):
    __tablename__ = 'Voto'
    __table_args__ = (
        ForeignKeyConstraint(['UtilizadorID'], ['Utilizador.UtilizadorID'], name='FKVoto117230'),
        ForeignKeyConstraint(['VotacaoID'], ['Votacao.VotacaoID'], name='FKVoto757754'),
        PrimaryKeyConstraint('VotacaoID', 'UtilizadorID', name='PK__Voto__6DD353A1CCDE06E3')
    )

    VotacaoID: Mapped[int] = mapped_column(Integer, primary_key=True)
    UtilizadorID: Mapped[int] = mapped_column(Integer, primary_key=True)
    EscolhaVoto: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    DataVoto: Mapped[datetime.datetime] = mapped_column(DateTime)

    Utilizador_: Mapped['Utilizador'] = relationship('Utilizador', back_populates='Voto')
    Votacao_: Mapped['Votacao'] = relationship('Votacao', back_populates='Voto')


class Manutencao(Base):
    __tablename__ = 'Manutencao'
    __table_args__ = (
        ForeignKeyConstraint(['EstadoManuID'], ['EstadoManutencao.EstadoManuID'], name='FKManutencao654470'),
        ForeignKeyConstraint(['OrcamentoOrcamentoID'], ['Orcamento.OrcamentoID'], name='FKManutencao941990'),
        ForeignKeyConstraint(['PMID'], ['PedidoManutencao.PMID'], name='FKManutencao23106'),
        PrimaryKeyConstraint('ManutencaoID', name='PK__Manutenc__8F43BF1220EAC264')
    )

    ManutencaoID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    DataManutencao: Mapped[datetime.date] = mapped_column(Date)
    DescManutencao: Mapped[str] = mapped_column(String(255, 'SQL_Latin1_General_CP1_CI_AS'))
    PMID: Mapped[int] = mapped_column(Integer)
    EstadoManuID: Mapped[int] = mapped_column(Integer)
    OrcamentoOrcamentoID: Mapped[int] = mapped_column(Integer)

    EstadoManutencao_: Mapped['EstadoManutencao'] = relationship('EstadoManutencao', back_populates='Manutencao')
    Orcamento_: Mapped['Orcamento'] = relationship('Orcamento', back_populates='Manutencao')
    PedidoManutencao_: Mapped['PedidoManutencao'] = relationship('PedidoManutencao', back_populates='Manutencao')


t_OrcamentoPedidoManutencao = Table(
    'OrcamentoPedidoManutencao', Base.metadata,
    Column('OrcamentoID', Integer, primary_key=True, nullable=False),
    Column('PMID', Integer, primary_key=True, nullable=False),
    ForeignKeyConstraint(['OrcamentoID'], ['Orcamento.OrcamentoID'], name='FKOrcamentoP892124'),
    ForeignKeyConstraint(['PMID'], ['PedidoManutencao.PMID'], name='FKOrcamentoP122167'),
    PrimaryKeyConstraint('OrcamentoID', 'PMID', name='PK__Orcament__3B5E98AF9025330A')
)


t_OrcamentoPedidoNovoRecurso = Table(
    'OrcamentoPedidoNovoRecurso', Base.metadata,
    Column('OrcamentoID', Integer, primary_key=True, nullable=False),
    Column('PedidoNovoRecID', Integer, primary_key=True, nullable=False),
    ForeignKeyConstraint(['OrcamentoID'], ['Orcamento.OrcamentoID'], name='FKOrcamentoP299373'),
    ForeignKeyConstraint(['PedidoNovoRecID'], ['PedidoNovoRecurso.PedidoNovoRecID'], name='FKOrcamentoP11081'),
    PrimaryKeyConstraint('OrcamentoID', 'PedidoNovoRecID', name='PK__Orcament__EEF263C940A7D5FA')
)


class PedidoReserva(Base):
    __tablename__ = 'PedidoReserva'
    __table_args__ = (
        ForeignKeyConstraint(['EstadoID'], ['EstadoPedidoReserva.EstadoID'], name='FKPedidoRese354298'),
        ForeignKeyConstraint(['RecursoID'], ['Recurso.RecursoID'], name='FKPedidoRese183537'),
        ForeignKeyConstraint(['UtilizadorID'], ['Utilizador.UtilizadorID'], name='FKPedidoRese738683'),
        PrimaryKeyConstraint('PedidoResevaID', name='PK__PedidoRe__3409FC90C0B0348D')
    )

    PedidoResevaID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    UtilizadorID: Mapped[int] = mapped_column(Integer)
    RecursoID: Mapped[int] = mapped_column(Integer)
    DataInicio: Mapped[datetime.date] = mapped_column(Date)
    DataFim: Mapped[datetime.date] = mapped_column(Date)
    EstadoID: Mapped[int] = mapped_column(Integer)

    EstadoPedidoReserva_: Mapped['EstadoPedidoReserva'] = relationship('EstadoPedidoReserva', back_populates='PedidoReserva')
    Recurso_: Mapped['Recurso'] = relationship('Recurso', back_populates='PedidoReserva')
    Utilizador_: Mapped['Utilizador'] = relationship('Utilizador', back_populates='PedidoReserva')
    Reserva: Mapped[List['Reserva']] = relationship('Reserva', back_populates='PedidoReserva_')


class VotacaoPedidoNovoRecurso(Base):
    __tablename__ = 'Votacao_PedidoNovoRecurso'
    __table_args__ = (
        ForeignKeyConstraint(['PedidoNovoRecID'], ['PedidoNovoRecurso.PedidoNovoRecID'], name='FKVotacao_Pe887386'),
        ForeignKeyConstraint(['VotacaoID'], ['Votacao.VotacaoID'], name='FKVotacao_Pe626152'),
        PrimaryKeyConstraint('VotacaoID', 'PedidoNovoRecID', 'TipoVotacao', name='PK__Votacao___5C10904DD7093C8A')
    )

    VotacaoID: Mapped[int] = mapped_column(Integer, primary_key=True)
    PedidoNovoRecID: Mapped[int] = mapped_column(Integer, primary_key=True)
    TipoVotacao: Mapped[bool] = mapped_column(Boolean, primary_key=True)

    PedidoNovoRecurso_: Mapped['PedidoNovoRecurso'] = relationship('PedidoNovoRecurso', back_populates='Votacao_PedidoNovoRecurso')
    Votacao_: Mapped['Votacao'] = relationship('Votacao', back_populates='Votacao_PedidoNovoRecurso')


class Reserva(Base):
    __tablename__ = 'Reserva'
    __table_args__ = (
        ForeignKeyConstraint(['PedidoResevaID'], ['PedidoReserva.PedidoResevaID'], name='FKReserva 41673'),
        PrimaryKeyConstraint('ReservaID', name='PK__Reserva__C39937033C0DF264')
    )

    ReservaID: Mapped[int] = mapped_column(Integer, Identity(start=1, increment=1), primary_key=True)
    PedidoResevaID: Mapped[int] = mapped_column(Integer)
    ConfirmarCaucaoDono: Mapped[bool] = mapped_column(Boolean)
    ConfirmarCaucaoVizinho: Mapped[bool] = mapped_column(Boolean)
    RecursoEntregueDono: Mapped[bool] = mapped_column(Boolean)
    RecursoEntregueVizinho: Mapped[bool] = mapped_column(Boolean)
    DevolucaoCaucao: Mapped[bool] = mapped_column(Boolean)
    EstadoRecurso: Mapped[bool] = mapped_column(Boolean)
    JustificacaoEstadoProduto: Mapped[Optional[str]] = mapped_column(TEXT(2147483647, 'SQL_Latin1_General_CP1_CI_AS'))

    PedidoReserva_: Mapped['PedidoReserva'] = relationship('PedidoReserva', back_populates='Reserva')
