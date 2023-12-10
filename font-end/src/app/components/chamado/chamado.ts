export interface Chamado {
    id?:                any,
    dataAbertura?:      string,
    dataFechamento?:    string,
    prioridade:         number,
    status:             number,
    titulo:             string,
    observacoes:        string,
    tecnico:            number,
    cliente:            number,
    nomeTecnico:        string,
    nomeCliente:        string
}