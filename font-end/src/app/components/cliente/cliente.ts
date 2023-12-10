export interface Cliente {
    id?:         string,
    nome:        string,
    cpf:         string,
    email:       string,
    senha:       string,
    perfis:      any[],
    dataCriacao: string
}