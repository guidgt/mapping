function Tarefa(controllerId, controller, model){

    this.controller = controller;
    this.controllerId = controllerId;
    this.model = model;
    tarefa = this;

    this.getController = function() {
        return this.controller;
    }

    this.setController = function(controller) {
        this.controller = controller;
    }

    this.getModel = function() {
        return this.model;
    }

    this.setModel = function(model) {
        this.model = model;
    }

    this.atualizarOrdem = function(tipo, tipoModel){
        if(tipo != ""){
            this.setController(tipo);
            this.setModel(tipoModel);
        }
        var acumulador = "";
        $('.ui-state-tarefas_atividades_projetos').each(function(){
            acumulador += $(this).attr(tipo) + '|';
        });
        acumulador = acumulador.substring(0, acumulador.length - 1);
        $.ajax({
            type: "get",
            url: $('#webroot').val()+'ajax'+'/atualizar_ordem/'+acumulador+'/'+this.getModel()
        });
    }

    this.atualizarOrdemTarefaProjeto = function(tipo, tipoModel){
        if(tipo != ""){
            this.setController(tipo);
            this.setModel(tipoModel);
        }
        var acumulador = "";
        $('.ui-state-'+this.controller).each(function(){
            acumulador += $(this).attr(tipo) + '|';
        });
        acumulador = acumulador.substring(0, acumulador.length - 1);
        $.ajax({
            type: "get",
            url: $('#webroot').val()+'ajax'+'/atualizar_ordem/'+acumulador+'/'+this.getModel()
        });
    }

    this.novaTarefaAtividade = function(atividadeProjetoId, form){
        var type = "GET";
        var data = "";
        var salvar = false;
        var erro = false;

        if(form != null){
            salvar = true;
            type = "POST";
            data = form;
        }


        $.ajax({
            type: type,
            data: data,
            async: true,
            url: $('#webroot').val() + 'tarefas_atividades_projetos/add/'+atividadeProjetoId,
            success: function(msg){
                if($(msg).find('.ui-state-error').length || $(msg).find("#tipo_flash").attr('value') == 'error'){
                    erro = true;
                }

                if(form != null && erro == false){
                    tarefa.getTarefasAtividade(atividadeProjetoId);
                }

                $('#accordionAtividadesTarefasAdd').animate({ scrollTop:0 }, 'fast');
                $('#accordionAtividadesTarefasDiv').animate({ scrollTop:0 }, 'fast');

                if(salvar){
                    if(erro){
                        $('#accordionAtividadesTarefasAdd').html(msg);
                        $('#accordionAtividadesTarefas').accordion( 'activate' , 1 );
                    }else{
                        $('#accordionAtividadesTarefasDiv').html(msg);
                        $('#accordionAtividadesTarefasAdd').html("");
                        $('#accordionAtividadesTarefas').accordion( 'activate' , 0 );
                    }
                }else{
                    $('#accordionAtividadesTarefasAdd').html(msg);
                    $('#accordionAtividadesTarefas').accordion( 'activate' , 1 );
                }

            }
        });
    }

    this.editarTarefaAtividade = function(tarefa_id, atividadeProjetoId, form){
        var type = "GET";
        var data = "";
        var salvar = false;
        var erro = false;
        var url = $('#webroot').val() + 'tarefas_atividades_projetos/edit/'+tarefa_id+'/'+atividadeProjetoId;

        if(form != null){
            salvar = true;
            type = "POST";
            data = form;
            url = $('#TarefasAtividadesProjetoEditForm').attr('action') + '/' + atividadeProjetoId;
        }

        $.ajax({
            type: type,
            data: data,
            async: false,
            url: url,
            success: function(msg){
                if($(msg).find('.ui-state-error').length || $(msg).find("#tipo_flash").attr('value') == 'error'){
                    erro = true;
                }
                
                if(form != null && erro == false){
                    tarefa.getTarefasAtividade(atividadeProjetoId);
                }

                $('#accordionAtividadesTarefasAdd').animate({ scrollTop:0 }, 'fast');
                $('#accordionAtividadesTarefasDiv').animate({ scrollTop:0 }, 'fast');

                if(salvar){
                    if(erro){
                        $('#accordionAtividadesTarefasAdd').html(msg);
                        $('#accordionAtividadesTarefas').accordion( 'activate' , 1 );
                    }else{
                        $('#accordionAtividadesTarefasDiv').html(msg);
                        $('#accordionAtividadesTarefasAdd').html("");
                        $('#accordionAtividadesTarefas').accordion( 'activate' , 0 );
                    }
                }else{
                    $('#accordionAtividadesTarefasAdd').html(msg);
                    $('#accordionAtividadesTarefas').accordion( 'activate' , 1 );
                }
            }
        });
    }

    this.getTarefasAtividade = function(atividadeProjetoId){
        $.ajax({
            type: "get",
            url: $('#webroot').val() + 'tarefas_atividades_projetos' +'/get_tarefas_atividade/'+atividadeProjetoId,
            success: function(msg){
                $('#accordionAtividadesTarefas').accordion( 'activate' , 0 );
                $('#accordionAtividadesTarefasDiv').html(msg);
                $('#accordionAtividadesTarefasDiv').animate({ scrollTop:0 }, 'fast');
                $('#accordionAtividadesTarefasEncerradas').html("");
            }
        });
    }

    this.getTarefasAtividadeEncerradas = function(atividadeProjetoId){
        $.ajax({
            type: "get",
            url: $('#webroot').val() + 'tarefas_atividades_projetos' +'/get_tarefas_encerradas/'+atividadeProjetoId,
            success: function(msg){
                $('#accordionAtividadesTarefas').accordion( 'activate' , 2 );
                $('#accordionAtividadesTarefasEncerradas').html(msg);
            }
        });
    }

    this.getTarefasAtividadeInativas = function(atividadeProjetoId){
        $.ajax({
            type: "get",
            url: $('#webroot').val() + 'tarefas_atividades_projetos' +'/get_tarefas_inativas/'+atividadeProjetoId,
            success: function(msg){
                $('#accordionAtividadesTarefas').accordion( 'activate' , 3 );
                $('#accordionAtividadesTarefasInativas').html(msg);
            }
        });
    }

    this.notividadeVarios = function(url, atividadesProjetoId){
        $.ajax({
            type: "get",
            async: false,
            url: url,
            complete: function(){
                tarefa.getTarefasAtividade(atividadesProjetoId);
            }
        });
    }

    this.exclirTarefasAtividade = function(tarefaId, atividadesProjetoId){
        
        $.ajax({
            type: "get",
            async: false,
            url: $('#webroot').val() + 'tarefas_atividades_projetos' +'/delete/' + tarefaId + '/'+atividadesProjetoId,
            complete: function(){
                tarefa.getTarefasAtividade(atividadesProjetoId);
            }
        });
    }

$(function(){
    $('#arvoreAtividadesTarefas').tree({
        callback : {
            ondblclk : function(NODE, TREE_OBJ){
                TREE_OBJ.toggle_branch.call(TREE_OBJ, NODE);
                TREE_OBJ.select_branch.call(TREE_OBJ, NODE);
                var children = TREE_OBJ.children(NODE);
                if(children.length == 0){
                    var atividadeId = TREE_OBJ.get_node(NODE).attr("id");
                    var rel = TREE_OBJ.get_node(NODE).attr("rel");
                    if(rel == 'subitem'){
                        atividadeId = atividadeId.substr(10);
                        tarefa.getTarefasAtividade(atividadeId);
                    }else{
                        if(rel == 'subsubitem'){
                            atividadeId = atividadeId.substr(13);
                            tarefa.getTarefasAtividade(atividadeId);
                        }
                    }
                }
            }
        },

        types : {
            "default" : {
                clickable	: true,
                renameable	: false,
                deletable	: false,
                creatable	: false,
                draggable	: false,
                max_children	: -1,
                max_depth	: -1,
                valid_children	: "all"
            },
            "item" : {
                valid_children : "item",
                icon : {
                    image : $('#webroot').val()+"js/jquery.jstree/processo.gif"
                }
            },
            "subitem" : {
                valid_children : "subitem",
                icon : {
                    image : $('#webroot').val()+"js/jquery.jstree/atividade_sub.gif"
                }
            },
            "papel" : {
                valid_children : "none",
                icon : {
                    image : $('#webroot').val()+"js/jquery.jstree/papel.gif"
                }
            }
        }
    });
//Fim arvore de Atividades Tarefas.
});

   this.marcarFavorito = function(tarefaAtividadeProjetoId,atividadesProjetoId){
        $.ajax({
            type: "get",
            url: $('#webroot').val() + 'tarefas_atividades_projetos' +'/marcar_favorito/'+tarefaAtividadeProjetoId,
            complete: function(){
                tarefa.getTarefasAtividade(atividadesProjetoId);
            }
        });
    }


     this.getRecursosByTarefasProjeto = function(projeto){
        if(projeto == undefined){
            projeto = null;
        }

        $.ajax({
            type:"get",
            async: false,
            url:$('#webroot').val() + 'ajax' +'/get_recursos_by_tarefas_projeto/'+this.getController()+'/get_recursos_by_tarefas_projeto/'+projeto,
            success:function(msg)
            {
                $('#recursoId').html(msg);
            }
        });
    }

}
