[ ] teste de rotas do app 
    -> Testar o header de /termo-de-uso e /politica-privacidade

[ ] botar swalfire

[ ] Validação Back-end
    -> Implementar Rate Limiting no back-end 
        limiter := rate.NewLimiter(5, 10) // 5 req por segundo

    -> if len(nameEscola) > 100 {
        http.Error(w, "Nome muito grande", 400)
        return
    }

    -> Use CORS corretamente 
        Access-Control-Allow-Origin: https://seudominio.com

        Não use * em produção se não for necessário.
        Isso impede outros sites de usarem seu endpoint via navegador.
