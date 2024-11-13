Feature: Api Pet Store

  Scenario: Criar usuario
    Given que tenho uma requisicao do tipo 'POST' para o endpoint 'https://petstore.swagger.io/v2/user/'
    And tenho os seguintes parametros:
      | id         |                         1 |
      | username   | outsera_cypress           |
      | firstName  | Outsera                   |
      | lastName   | Cypress                   |
      | email      | outsera_cypress@email.com |
      | password   | outseraU8$3               |
      | phone      |        +55(27) 99596-7413 |
      | userStatus |                         1 |
    When a requisicao e enviada
    Then o status code de resposta deve ser '200'
    And o response body nao pode retornar vazio

  Scenario: Consultar usuario
    Given que tenho uma requisicao do tipo 'GET' para o endpoint 'https://petstore.swagger.io/v2/user/usuario'
    When a requisicao e enviada
    Then o status code de resposta deve ser '200'
    And o response body deve conter os dados do usuario criado no cenario anterior

  Scenario: Atualizar o usuario
    Given que tenho uma requisicao do tipo 'PUT' para o endpoint 'https://petstore.swagger.io/v2/user/usuario'
    And tenho os seguintes parametros:
      | id         |                         1 |
      | username   | outsera_cypress           |
      | firstName  | Outsera                   |
      | lastName   | Cypress                   |
      | email      | outsera_cypress@email.com |
      | password   | outseraU8$3               |
      | phone      |        +55(94) 99119-8183 |
      | userStatus |                         2 |
    When a requisicao e enviada
    Then o status code de resposta deve ser '200'
    And o response body nao pode retornar vazio

  Scenario: Deletar usuario
    Given que tenho uma requisicao do tipo 'DELETE' para o endpoint 'https://petstore.swagger.io/v2/user/usuario'
    When a requisicao e enviada
    Then o status code de resposta deve ser '200'
    And o response body deve conter o nome de usuario

  Scenario: Verifica se o usuario foi deletado
    Given que tenho uma requisicao do tipo 'GET' para o endpoint 'https://petstore.swagger.io/v2/user/usuario'
    When a requisicao e enviada
    Then o usuario nao deve mais existir
