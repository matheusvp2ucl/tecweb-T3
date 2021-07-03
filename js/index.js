var controller = {

    listaUsuarios : [],

    getlistaUsuarios : function(){
        this.listaUsuarios = JSON.parse( localStorage.getItem('usuarios') );
        return this.listaUsuarios;
    },

    setlistaUsuarios : function(){
        localStorage.setItem('usuarios',JSON.stringify(this.listaUsuarios));
    },

    getUsuario : function(codigo){
        return this.listaUsuarios.find( u => { return u.codigo == codigo});
    },

    salvarUsuario : function(usuario){
        this.getlistaUsuarios();
        if(this.listaUsuarios == null){
            usuario.codigo = 1
            this.listaUsuarios = []
            this.listaUsuarios.push(usuario)
            this.setlistaUsuarios();
            return;
        }
        if (usuario.codigo > 0){
            let u = this.listaUsuarios.find( u => { return u.codigo == usuario.codigo});
            u.codigo = usuario.codigo;
            u.nome = usuario.nome;
            u.unidade = usuario.unidade;
        }else{
            let count = 0;
            this.listaUsuarios.forEach(u =>{ count = Math.max(count, u.codigo)});
            usuario.codigo = count + 1;
            this.listaUsuarios.push(usuario);
        }
        this.setlistaUsuarios();
    },

    excluirUsuario : function(codigo){
        this.getlistaUsuarios();
        let index = this.listaUsuarios.findIndex( p => { return p.codigo == codigo});
        if (index >= 0){
            this.listaUsuarios.splice(index,1);
        }
        this.setlistaUsuarios();
    }
}

controleDados.salvarUsuario(new Usuario(1, "Matheus", "123"))
controleDados.salvarUsuario(new Usuario(1, "Matheus", "123"))
