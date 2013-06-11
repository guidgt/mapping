function Alocacao(controllerId, controller, model, idsNivelMenor){
    this.controller = controller;
    this.controllerId = controllerId;
    this.model = model;
    this.idsNivelMenor = idsNivelMenor;
    this.validaNivelAtividadeTarefa = validaNivelAtividadeTarefa;
    this.montarArvore = montarArvore;

    this.getController = function() {
        return this.controller;
    }

    this.getControllerId = function() {
        return this.controllerId;
    }

    this.setControllerId = function(controllerId) {
        this.controllerId = controllerId;
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

    function getIdsNivelMenor() {
        return this.idsNivelMenor;
    }

    this.setIdsNivelMenor = function(idsNivelMenor) {
        this.idsNivelMenor = idsNivelMenor;
    }

    function validaNivelAtividadeTarefa(id){
        var retorno = false;
        if(id != undefined){
            var dadosMenorNivel = getIdsNivelMenor();
            var idExplode = id.split("_");

            if(idExplode[0] == 'Atividade'){
                dadosMenorNivel = dadosMenorNivel.AtividadeProjeto;
            }
            else if(idExplode[0] == 'TarefasAtividadesProjeto' || idExplode[0] == 'ChildTarefasAtividadesProjeto'){
                dadosMenorNivel = dadosMenorNivel.TarefaProjeto;
            }
            else if(idExplode[0] == 'Tarefa'){
                dadosMenorNivel = dadosMenorNivel.TarefaServico;
            }else{
                dadosMenorNivel = null;
            }
            if(dadosMenorNivel!=null){
                $.each(dadosMenorNivel, function(i,item){
                    if(item == idExplode[1]){
                        retorno = true;
                    }
                });
            }
        }
        return retorno;
    }

    function validaSelecao(NODE,TREE_OBJ, onopen){
        try{
            var noIdExplode = TREE_OBJ.get_node(NODE).attr("id").split('_');
            var tipo = noIdExplode[0];
            var nome = TREE_OBJ.get_node(NODE).attr("nome");
            var id = TREE_OBJ.get_node(NODE).attr("id");
            var validate = validaNivelAtividadeTarefa(id);
            if((tipo == 'Tarefa' || tipo == 'Atividade' || tipo == 'TarefasAtividadesProjeto' || tipo == 'ChildTarefasAtividadesProjeto') && nome != undefined && validate){
                $("#valor").css('color','green');
                if(tipo=='TarefasAtividadesProjeto' || tipo == 'ChildTarefasAtividadesProjeto'){
                    $("#tipo").text('Tarefa');
                }else{
                    $("#tipo").text(tipo);
                }
                $("#valor").text(nome);
            }else{
                var idChild = TREE_OBJ.children(NODE).attr("id");
                if(idChild != undefined){
                    var idChildExplode = idChild.split("_");
                    if(idChildExplode[0]=='TarefasAtividadesProjeto' || idChildExplode[0]=='ChildTarefasAtividadesProjeto' || idChildExplode[0]=='Tarefa' || idChildExplode[0]=='Servico'){
                        $("#tipo").text('Tarefa');
                        $("#valor").css('color','red');
                        $("#valor").text('Selecione uma tarefa.');
                    }else if(idChildExplode[0]=='Atividade'){
                        $("#tipo").text('Atividade');
                        $("#valor").css('color','red');
                        $("#valor").text('Selecione uma atividade.');
                    }
                }
            }
        }
        catch(exception){}
    }

    function montarArvore(){
        $('#arvoreProjetosServicos').tree({
            callback : {
                onselect : function(NODE, TREE_OBJ){
                    validaSelecao(NODE,TREE_OBJ);
                },
                onopen : function(NODE, TREE_OBJ) {
                    validaSelecao(NODE,TREE_OBJ);
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
                "item_projeto" : {
                    valid_children : "item_projeto",
                    icon : {
                        image : $('#webroot').val()+"js/jquery.jstree/projeto.png"
                    }
                },
                "item_servico" : {
                    valid_children : "item_servico",
                    icon : {
                        image : $('#webroot').val()+"js/jquery.jstree/servico.png"
                    }
                },
                "item_tarefa" : {
                    valid_children : null,
                    icon : {
                        image : $('#webroot').val()+"js/jquery.jstree/tarefa.png"
                    }
                },
                "item_atividade" : {
                    valid_children : "item_atividade",
                    icon : {
                        image : $('#webroot').val()+"js/jquery.jstree/atividade.png"
                    }
                }
            }

        });
    //Fim arvore de Atividades Tarefas.
    }
}

//$(function(){
//
//});
