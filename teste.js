const boletofunc = require('./src/index') // Importando o módulo e atribuindo numa constante

// Número do boleto para teste no terminal
// O número pode conter pontos e espaços pois serão tratados
let boletocodigo = "74891 12024 03943.907380 23105.411054 2 82820000051180"
//let boletocodigo = "123482938102381039810293810938093819023810982309182301238109238109328091"
//let boletocodigo = "10499898100000214032006561000100040099726390"
//let boletocodigo = "23797000000000000004150090019801673500021140"
//let boletocodigo = "10492006506100010004200997263900989810000021403"
//let boletocodigo = "23797000000000000004150090019801673500021140"
//let boletocodigo = "83860000005096000190000008017823000034306271"
//let boletocodigo = "858200000007572503282030560708202107539591904460"

// Retorna true ou false se o codigo do boleto é válido ou não
let validacao = boletofunc.validarBoleto(boletocodigo)

// Retorna os dados do boleto em um objeto
let dados = boletofunc.dadosBoleto(boletocodigo)

// Retornando no terminal todos os dados
console.log(validacao)
console.log("\n")
console.log(dados)