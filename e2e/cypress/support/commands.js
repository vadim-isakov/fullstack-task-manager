Cypress.Commands.add('login', () => { 
  cy.request({
    method: 'POST',
    url: '/api/auth/token',
    form: true,
    body: {
      username: Cypress.env('USERNAME'),
      password: Cypress.env('PASSWORD') 
    }
  }).then((resp) => {
    window.localStorage.setItem('token', resp.body.access_token)
  })
})


Cypress.Commands.add('getConfirmUrl', email => { 
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('MAIL_SERVER_URL')}api/v2/search?kind=to&query=${email}&limit=1`
  }).then((resp) => {
    const html = JSON.stringify(resp.body.items[0].Content.Body)
    var el = document.createElement( 'html' );
    el.innerHTML = html;
    return el.getElementsByTagName('a')[0].getAttribute("href").replace(/\\"/g, "");
  })
})