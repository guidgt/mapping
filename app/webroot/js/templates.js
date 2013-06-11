function Template(controllerId, controller, model){
    this.controller = controller;
    this.controllerId = controllerId;
    this.model = model;
    template = this;

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


    this.checaNivelAtividade = function(TREE_OBJ, NODE){

        contNivelAcima = template.contNivelAcima(TREE_OBJ, NODE);
        contNivelAbaixo = template.contNivelAbaixo(TREE_OBJ, NODE, true);

        //Garante que a árvore possua apenas 4 niveis de atividades.
        if((contNivelAcima+contNivelAbaixo) < 4){
            return true;
        }else{
            return false;
        }
    }

    this.contNivelAcima = function(TREE_OBJ, NODE){
        //Contabiliza niveis acima
        parent = TREE_OBJ.parent(NODE);
        contNivelAcima = 0;
        //Enquanto não for a raiz, faz a busca e contabiliza o próximo parent
        if($(parent).attr('id') != undefined)
        while($(parent).attr('id') != "item_1"){
            parent = TREE_OBJ.parent(parent);
            contNivelAcima++;
        }
        return contNivelAcima;
    }

    this.contNivelAbaixo = function(TREE_OBJ, NODE, isNoMovido){
        var count = null;
        if(isNoMovido == true){//Não contabilizar o nó que está sendo movido
            count = 0;
        }else{
            count = 1;
        }
        //variável que guarda a maior qtde de niveis maior dos filhos do nó que está sendo movido
        var maiorQtdeNiveisAbaixo = 0;
        var children = TREE_OBJ.children(NODE);
        $.each(children, function(i,child){
            //Se os filhos tem outros filhos chama a função novamente para navegar entre eles e contabilizar niveis
            if(TREE_OBJ.children(child).length > 0){
                aux = template.contNivelAbaixo(TREE_OBJ, child);
            }else{
                aux = 1;
            }
            if(aux > maiorQtdeNiveisAbaixo){
                maiorQtdeNiveisAbaixo = aux;
            }
        });
        count += maiorQtdeNiveisAbaixo;
        return count;
    }
}

$(function(){

    $("#arvoreTemplate").tree({
        callback : {
            onmove : function (NODE,REF_NODE,TYPE,TREE_OBJ,RB) {
                var AUX_NODE = TREE_OBJ.parent(NODE);
                var permitido = template.checaNivelAtividade(TREE_OBJ, NODE);
                if(permitido){
                    //Garantir sequência das atividades
                    $("li[id^='Atividade']").each(function(i, val) {
                        val.value = i;
                    });

                    var atividade = null;
                    var retorno = true;

                    vetor = new Array();
                    indice = 0;

                    AUX_NODE = TREE_OBJ.children(AUX_NODE);
                    for (var i = 0; AUX_NODE != false; i++) {
                        separa = TREE_OBJ.get_node(AUX_NODE).attr("id").split('_');
                        valor = TREE_OBJ.get_node(AUX_NODE).attr("value");
                        atividade = separa[1];
                        //TREE_OBJ.get_node(AUX_NODE).val(i);
                        AUX_NODE = TREE_OBJ.next(AUX_NODE, true);
                        if(parseInt(atividade) != 0){
                            vetor[indice] = atividade+";"+valor;
                            indice++;
                        }
                    }

                    var node_id = TREE_OBJ.get_node(NODE).attr("id").split('_');
                    var parent = TREE_OBJ.parent(NODE).attr("id").split('_');
                    if(parent[0] != "item"){
                        retorno = geral.updateSequencia(geral.arr2jsonToBase64(vetor), node_id[1], parent[1]);
                    }else{
                        retorno = geral.updateSequencia(geral.arr2jsonToBase64(vetor), node_id[1], '');
                    }

                    if (retorno != true){
                        $.tree.rollback(RB);
                        $('#flashMessage').html("Erro. A Atividade não foi movida. Tente novamente.");
                        $('#msginfo').fadeIn(500);
                        setTimeout("$('#msginfo').fadeOut(500)",4000);
                    }
                }else{
                    $.tree.rollback(RB);
                    $('#flashMessage').html("Erro. A Atividade não pode ser movida para esse nível.");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                    retorno = false;
                }
                return retorno;
            },

            ondblclk : function(NODE, TREE_OBJ){
                TREE_OBJ.toggle_branch.call(TREE_OBJ, NODE);
                TREE_OBJ.select_branch.call(TREE_OBJ, NODE);
                var rel = TREE_OBJ.get_node(NODE).attr("rel");
                separa = TREE_OBJ.get_node(NODE).attr("id").split('_');
                if(rel == 'subitem' ){
                    atividadeId = separa[1];
                    $('#atividadeViewVal').val(atividadeId);
                    geral.selecionarPapel(atividadeId, 'selecionar_papel');
                    atividadeNome = TREE_OBJ.get_text(NODE);
                    $('#atividadeView').text(atividadeNome);
                    $('#accordion').accordion( 'activate' , 1 );
                }

                if(rel == 'subsubitem'){
                    atividadeId = separa[1];
                    $('#atividadeViewVal').val(atividadeId);
                    geral.selecionarPapel(atividadeId, 'selecionar_papel');
                    atividadeNome = TREE_OBJ.get_text(NODE);
                    $('#atividadeView').text(atividadeNome);
                    $('#accordion').accordion( 'activate' , 1 );
                }
            },

            beforedelete : function(NODE,TREE_OBJ){
                var atividade = null;
                var atividadeRemovida = null;
                var retorno;
                var nodePosterior = TREE_OBJ.get_node(NODE).attr("value");
                var atividadeNome = TREE_OBJ.get_node(NODE).attr("name");
                if(nodePosterior != null){
                    separa = TREE_OBJ.get_node(NODE).attr("id").split('_');
                    NODE = TREE_OBJ.next(NODE, true);
//                    for (var i = nodePosterior; NODE != false; i++) {
//                        atividade = TREE_OBJ.get_node(NODE).attr("id");
//                        atividade = atividade.substr(10);
//                        //geral.updateSequencia(atividade, i);
//                        TREE_OBJ.get_node(NODE).val(i);
//                        NODE = TREE_OBJ.next(NODE, true);
//
//                    }
                    
                    var atividadeId = geral.removeAtividade(separa[1],nodePosterior);
                    if(atividadeId != false){
                    	if(atividadeId == 'subAtividade'){
                    		retorno = true;
                    		$('#tableVisualizar').hide();
                    	}else{
	                        retorno = true;
	                        $('#tableVisualizar').hide();
	//                        geral.carregarAtividades(atividadeId, atividadeNome, 'atividade', 'selectAtividade');
	                        $("#atividade").append("<option value='"+atividadeId+"' >"+atividadeNome+"</option>");
	                        $('#atividade option[value=""]').remove();
	                        var selectAtividade = document.getElementById("atividade");
	                        geral.sortSelect(selectAtividade);
	//                        geral.carregarAtividades(atividadeId, 'modalAtividadeParent', 'selectAtividadeModal');
	                        $("#modalAtividadeParent").append("<option value='"+atividadeId+"' >"+atividadeNome+"</option>");
	                        var selectAtividadeParent = document.getElementById("modalAtividadeParent");
	                        geral.sortSelect(selectAtividadeParent);
	                        $("#atividade").append("<option value='' >Nova Atividade...</option>");
                    	}
                    }else{
                        retorno = false;
                        $('#flashMessage').html("ERRO. Atividade não foi removida.");
                        $('#msginfo').fadeIn(500);
                        setTimeout("$('#msginfo').fadeOut(500)",4000);
                    }
                    $('#accordion').accordion( 'activate' , 0 );
                }else{
                    $('#flashMessage').html("Selecione uma Atividade para ser removida.");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                }
                return retorno;
            },
            
            oncreate : function(NODE, REF_NODE, TYPE, TREE_OBJ, RB){
                $('#modalAtividadeParent').val(1);
                $('#modalAtividadeNome').val('Teste');
                $('#modalAtividadeDescricao').val('Teste');
                //geral.novaAtividade();
                TREE_OBJ.get_text(NODE)
            }

        },
        
        types : {
            "default" : {
                clickable	: true,
                renameable	: true,
                deletable	: true,
                creatable	: true,
                draggable	: true,
                max_children	: -1,
                max_depth	: -1,
                valid_children	: "none"
            },
            "item" : {
                draggable : true,
                deletable : false,
                creatable : true,
                valid_children :  [ "default", "subitem" ],
                icon : {
                    image : $('#webroot').val()+"js/jquery.jstree/processo.gif"
                }
            },
            "subitem" : {
                valid_children : ["subitem"],
                icon : {
                    image : $('#webroot').val()+"js/jquery.jstree/atividade_sub.gif"
                }

            }
//            "subsubitem" : {
//                draggable : false,
//                deletable : false,
//                valid_children : "none",
//                icon : {
//                    image : $('#webroot').val()+"js/jquery.jstree/atividade_sub.gif"
//                }
//            }
        }

    });
});


