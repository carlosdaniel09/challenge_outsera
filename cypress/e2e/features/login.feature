Feature: Login

  Scenario: Login com dados validos
    Given que o usuario esta na pagina de login
    When o usuario preenche os campos com dados validos e clica no botao 'Login'
    Then o usuario deve ser redirecionado para a pagina 'dashboard'

  Scenario: Tentativa de login com o campo senha incorreta
    Given que o usuario esta na pagina de login
    When o usuario preenche o campo senha com uma senha incorreta e clica no botao 'Login'
    Then uma mensagem de erro 'Por favor, entre com um usuário e senha corretos. Note que ambos os campos diferenciam maiúsculas e minúsculas.' deve ser exibida

  Scenario: Tentativa de login com o campo usuario incorreto
    Given que o usuario esta na pagina de login
    When o usuario preenche o campo com um usuario incorreto e clica no botao 'Login'
    Then uma mensagem de erro 'Por favor, entre com um usuário e senha corretos. Note que ambos os campos diferenciam maiúsculas e minúsculas.' deve ser exibida

  Scenario: Acessando a pagina 'About Us'
    Given que o usuario esta na pagina de login
    When o usuario preenche os campos com dados validos e clica no botao 'Login'
    And navega ate a pagina 'About us'
    Then o usuario deve ser redirecionado para a pagina 'About us'
