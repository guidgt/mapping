function Projeto(controllerId, controller, model, atividadesTarefa, horasPonto){
    this.controller = controller;
    this.controllerId = controllerId;
    this.model = model;
    this.atividadesTarefa = atividadesTarefa;
    projeto = this;
    this.horasPonto = horasPonto;

    this.getController = function() {
        return this.controller;
    }

    this.getControllerId = function() {
        return this.controllerId;
    }

    this.setControllerId = function(controllerId) {
        this.controllerId = controllerId;
    }

    this.getAtividadesTarefa = function() {
        return this.atividadesTarefa;
    }

    this.setAtividadesTarefa = function(atividadesTarefa) {
        this.atividadesTarefa = atividadesTarefa;
    }

    this.setController = function(controller) {
        this.controller = controller;
    }
    
    this.setHorasPontoFuncao = function(valor) {
        this.horasPonto = valor;
    }

    this.getHorasPontoFuncao = function() {
        return this.horasPonto;
    }

    this.addPontoFuncao = function(val) {
        var template = $('#xmpaddPontoFuncao').html().replace(/#num#/g,val);
        var $template = $(template);
        return $template;
    }

    this.verificaAcompanhamento = function(val){
        if (val.attr('checked')){
            $('#criticidade').attr('disabled','');
        }else{
            $('#criticidade').attr('disabled',true);


        }
    }

    this.getFuncaoProdutividade = function(){
        var soma = 0;
        vetorIds = new Array();
        $("input[id^='TecnologiaTecnologia']:checked").each(function(i){
            $('#pontoFuncao'+$(this).val()).attr('disabled',false);
            $('#produtividade'+$(this).val()).attr('disabled',false);
            $('#pontoFuncao'+$(this).val()).show();
            $('#produtividade'+$(this).val()).show();
            $('#labelPontoFuncao'+$(this).val()).show();
            $('#labelProdutividade'+$(this).val()).show();
            vetorIds[i] = $(this).val();
        });

        if(vetorIds!=''){
        
                    var retorno = this.getHorasPontoFuncao();

                    for(var x=0; x < retorno.length; x++){
                        if($('#produtividade'+retorno[x]['tecnologia_id']).val() == ""){
                            $('#produtividade'+retorno[x]['tecnologia_id']).val(retorno[x]['produtividade']);
                        }
                        if($('#pontoFuncao'+retorno[x]['tecnologia_id']).val() == "" && retorno[x]['ponto_funcao']!= ""){
                            $('#pontoFuncao'+retorno[x]['tecnologia_id']).val(retorno[x]['ponto_funcao']);
                        }
                        soma = soma + new Number($('#produtividade'+retorno[x]['tecnologia_id']).val() * $('#pontoFuncao'+retorno[x]['tecnologia_id']).val());
                    }
                    $('#horas').val(soma);
                    projeto.calculaHoras();
         
         
        }
        else{
            $('#horas').val(0);
            projeto.calculaHoras();
        }
    }

    this.calculaHoras = function(){
        var soma = 0;
        $("input[id^='TecnologiaTecnologia']:checked").each(function(i){
            var id = $(this).val();
            soma = soma + new Number($('#produtividade'+id).val() * $('#pontoFuncao'+id).val());
            $('#horas').val(soma);
        });
        $('#horas').val(soma);
        this.calculaHorasTotal();
    }

    this.calculaHorasTotal = function(){
        var horas = new Number($('#horas').val());
        var horasAdd = new Number($('#horasAdicionais').val());
        var valor = (horas + horasAdd);
        $('#totalHoras').val(valor);
    }

    this.verificaValidacao = function(){
        
        $('#msgerroPontoProdut').remove();        
        var retorno = true;
        var string = "<ul id='msgerroPontoProdut'>";
        $("input[id^='TecnologiaTecnologia']:checked").each(function(i){
            if($('#pontoFuncao'+$(this).val()).val() == ""){
                string = string + "<li>O campo Ponto Função da Tecnologia "+ $('label[for=TecnologiaTecnologia'+$(this).val()+']').text()+" é obrigatorio.</li>";
                $('#tabpanel').tabs('option', 'selected', 1);
                $("#pontoFuncao"+$(this).val()).focus();
                retorno = false;
            }
            else if($('#pontoFuncao'+$(this).val()).val() < 1){
                string = string + "<li>O Ponto Função da Tecnologia "+ $('label[for=TecnologiaTecnologia'+$(this).val()+']').text()+" não pode ser menor que 1.</li>";
                $("#pontoFuncao"+$(this).val()).focus();
                retorno = false;
            }
            if($('#produtividade'+$(this).val()).val() == ""){
                string = string + "<li>O campo Produtividade da Tecnologia "+ $('label[for=TecnologiaTecnologia'+$(this).val()+']').text()+" é obrigatorio.</li>";
                retorno = false;
            }
        });

       
        
        if(retorno == false){
            string = string + "</ul>";
            $('#msgerro').append(string);
            $('#msgerro').show();
        }
        if($('#msgerro').text() == ""){
            $('#msgerro').hide();
        }
        return retorno;
    }


    this.validaQuestionario = function(){

          $('#msgerroPontoProdut').remove();
        var retorno = true;
        var string = "<ul id='msgerroPontoProdut'>";

     if($("#classificacao_atividade").val() == ''){
            string = string + "<li>A classificação da Atividade é um campo obrigatório.</li>";
            retorno = false;
        }

        if($("#classificacao_atividade").val() == '3'){
            if($("#QuestionarioClassificacaoProjeto").val()=='5'){
                if($("#QuestionarioPossuiPlanoNegocio").attr('checked') == false){
                    string = string + "<li>A classificação de Projeto escolhida, implica na existência de um Plano de negócios.</li>";
                    retorno = false;
                }
            }else if($("#QuestionarioClassificacaoProjeto").val()==''){
                string = string + "<li>Classicação de Projeto é um campo obrigatório.</li>";
                retorno = false;
            }

        }


        if($("#classificacao_atividade").val() == '4'){
            if($("#QuestionarioClassificacaoServico").val()=='1'){

                var receitaEstimada = $("#QuestionarioReceitaEstimada").val();
                if(receitaEstimada == ''){
                    string = string + "<li>Receita Estimada é um campo obrigatório.</li>";
                    retorno = false;
                }else{
                    receitaEstimada = receitaEstimada.replace(".","");
                    receitaEstimada = receitaEstimada.replace(",",".");
                    if(parseFloat(receitaEstimada) < 1){
                        string = string + "<li>Receita Estimada não é válida.</li>";
                        retorno = false;
                    }
                }

            }else if($("#QuestionarioClassificacaoServico").val()==''){
                string = string + "<li>Classicação de Serviço é um campo obrigatório.</li>";
                retorno = false;
            }
        }


        if(retorno == false){
            string = string + "</ul>";
            $('#msgerro').append(string);
            $('#msgerro').show();
        }
        if($('#msgerro').text() == ""){
            $('#msgerro').hide();
        }
        return retorno;
}




    this.checaAtividade = function(){
        if($('#classificacao_atividade').val() == 3){
            $('#classificacao_projeto').show();
            $('#classificacao_servico').hide();
        } else if($('#classificacao_atividade').val() == 4){
            $('#classificacao_projeto').hide();
            $('#classificacao_servico').show();
        }
    }

    this.ordenar = function(a, b) {
        return $(a).text() > $(b).text() ? 1 : -1;
    }

    this.selecionarRecurso = function(papel, setor){
        if(setor != null){
            papel = papel + '/' + setor;
        }
        $.ajax({
            type: "get",
            url: $('#webroot').val() + 'ajax' +'/selecionar_recurso_in_projeto/'+this.getControllerId()+'/'+papel+'/'+this.getController()+'/selecionar_recurso',
            success: function(msg){
                $('#tableVisualizar').show();
                $('#spanVisualizar').hide();
                $('#geralBox').html(msg);
                $('#box2View option').each(function(){
                    var box2 = $(this).val();
                    $('#box1View option').each(function(){
                        var box1 = $(this).val();
                        if(box1 == box2){
                            $(this).remove();
                        }
                    })
                });
                $.configureBoxes();
                $('#box1Filter').val('');
                $('#box2Filter').val('');
            }
        });
    }

    this.editarPapel = function(){
        var papelAtividade = $('#papelRecursoViewVal').val();
        papelAtividade = papelAtividade.split('|');
        var papel = papelAtividade[0];
        var atividade = papelAtividade[1];

        var recursos = "";
        $('#box2View option').each(function(){
            recursos = recursos + $(this).val() + '|';
        });

        recursos = recursos.substr(0,recursos.length-1)

        $.ajax({
            type: "get",
            async: false,
            url: $('#webroot').val() + 'ajax' +'/editar_papel_in_projeto/'+this.getControllerId()+'/'+papel+'/'+$.base64Encode(recursos),
            success: function(msg){
                $('#accordionRecurso').accordion( 'activate' , 0 );
                $('#tableVisualizarPapeis').show();
                $('#spanVisualizarRecursos').hide();
                $('#flashMessage').html(msg);
                $('#msginfo').fadeIn(500);
                setTimeout("$('#msginfo').fadeOut(500)",4000);
            //projeto.buscarPapel(atividade);
            }
        });
    }

    this.markerTecnologia = function(value){
        projeto.getFuncaoProdutividade();
        if (value.attr('checked')){
            $('#pontoFuncao'+value.val()).attr('disabled',false);
            $('#produtividade'+value.val()).attr('disabled',false);
            $('#pontoFuncao'+value.val()).show();
            $('#produtividade'+value.val()).show();
            $('#labelPontoFuncao'+value.val()).show();
            $('#labelProdutividade'+value.val()).show();
            projeto.calculaHoras();
        }else{
            $('#pontoFuncao'+value.val()).hide();
            $('#produtividade'+value.val()).hide();
            $('#labelPontoFuncao'+value.val()).hide();
            $('#labelProdutividade'+value.val()).hide();
            $('#pontoFuncao'+value.val()).attr('disabled',true);
            $('#produtividade'+value.val()).attr('disabled',true);
            $('#pontoFuncao'+value.val()).val("");
            $('#produtividade'+value.val()).val("");
            projeto.calculaHoras();
        }
    }

    this.listarPapeis = function(){
        
    }

    this.checaNivelAtividade = function(TREE_OBJ, NODE){

        contNivelAcima = projeto.contNivelAcima(TREE_OBJ, NODE);
        contNivelAbaixo = projeto.contNivelAbaixo(TREE_OBJ, NODE, true);

        //Verifica se o nó parent do nó que está sendo movido, possui tarefas
        idParent = $(TREE_OBJ.parent(NODE)).attr('id');
        validaTarefaAtividadeParent = true;
        if(TREE_OBJ.parent(NODE) == -1){
            validaTarefaAtividadeParent = false;
            
        }else{
            if(idParent != 'item_1'){//Se o nó foi movido para o nó raiz, não é necessário verificar se existe tarefas para a atividade
                idExplode = idParent.split('_');
                validaTarefaAtividadeParent = projeto.verificaTarefa(idExplode[1]);
            }
        }

        
        //Verifica se o nó movido, possui tarefas
        var parent = TREE_OBJ.parent(NODE);
        id = $(NODE).attr('id');
        idExplode = id.split('_');
        validaTarefaAtividadeMovida = projeto.verificaTarefa(idExplode[1]);
        //Garante que a árvore possua apenas 4 niveis de atividades.
        if((contNivelAcima+contNivelAbaixo) < 4 && validaTarefaAtividadeParent && validaTarefaAtividadeMovida){
            return true;
        }else{
            return false;
        }
    }

    this.contNivelAcima = function(TREE_OBJ, NODE){
        //Contabiliza niveis acima
        var parent = TREE_OBJ.parent(NODE);
        var contNivelAcima = 0;
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
                aux = projeto.contNivelAbaixo(TREE_OBJ, child);
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
    
    this.verificaTarefa = function(id){
        var retorno = true;
        var atividadesComTarefas = projeto.getAtividadesTarefa();
        if(atividadesComTarefas.length > 0){
            $.each(atividadesComTarefas, function(i,item){
                if(item == id){
                    retorno = false;
                }
            });
        }
        return retorno;
    }
}

$(function(){
    //Inicio da Arvore de Atividades.
    $("#arvoreProjeto").tree({
        callback : {
            onmove : function (NODE,REF_NODE,TYPE,TREE_OBJ,RB) {
                var AUX_NODE = TREE_OBJ.parent(NODE);
                var permitido = false;

                // Verifica se o movimento é permitido:
                if(projeto.checaNivelAtividade(TREE_OBJ, NODE)){
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
    //                    TREE_OBJ.get_node(AUX_NODE).val(i);
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
                var atividadeId = TREE_OBJ.get_node(NODE).attr("id");
                var rel = TREE_OBJ.get_node(NODE).attr("rel");
                if(rel == 'subitem'){
                    atividadeId = atividadeId.substr(10);
                    $('#atividadeViewVal').val(atividadeId);
                      $('#recursoViewVal').val(atividadeId);
                    geral.selecionarPapel(atividadeId, 'selecionar_papel');
                    atividadeNome = TREE_OBJ.get_text(NODE);
                    $('#atividadeView').text(atividadeNome);
                    $('#recursoView').text(atividadeNome);
                    $('#accordion').accordion( 'activate' , 1 );
                     geral.selecionarResponsavel(atividadeId, 'selecionar_responsavel_atividade');
                    }else{
                    if(rel == 'subsubitem'){
                        atividadeId = atividadeId.substr(13);
                        $('#atividadeViewVal').val(atividadeId);
                        $('#recursoViewVal').val(atividadeId);
                        geral.selecionarPapel(atividadeId, 'selecionar_papel');
                        atividadeNome = TREE_OBJ.get_text(NODE);
                        $('#atividadeView').text(atividadeNome);
                        $('#recursoView').text(atividadeNome);
                        $('#accordion').accordion( 'activate' , 1 );
                        geral.selecionarResponsavel(atividadeId, 'selecionar_responsavel_atividade');
                    }
                }



                //chama listar recursos da atividade - para qualquer nível de atividade...

            },

            beforedelete : function(NODE,TREE_OBJ){
                var atividadeRemovida = null;
                var retorno;
                var nodePosterior = TREE_OBJ.get_node(NODE).attr("value");
                if(nodePosterior != null){
                    separa = TREE_OBJ.get_node(NODE).attr("id").split('_');
                    atividadeRemovida = TREE_OBJ.get_node(NODE).attr("id");
                    var atividadeNome = TREE_OBJ.get_node(NODE).attr("name");
                    atividadeRemovida = atividadeRemovida.split('_');
                    
                    var resposta = $.ajax({
                        type: "get",
                        async: false,
                        dateType: 'html',
                        url: $('#webroot').val() + 'ajax' +'/checar_alocacoes/'+projeto.getControllerId()+'/'+atividadeRemovida[1]+'/'+'Projeto'
                    }).responseText;

                    if(resposta!=0){

                         $('#modalNovaAtividade').html(resposta);
                         $('#mudarAtividade').attr('atividadeRemovida', atividadeRemovida[1]);
                         $('#modAtividade').dialog('open');
                    }else{
                        var atividadeId = geral.removeAtividade(separa[1],nodePosterior);
                        if(atividadeId != false){

                            if(atividadeId == 'subAtividade'){
                                    retorno = true;
                                    $('#tableVisualizar').hide();
                            }else{

                                retorno = true;
                                $('#tableVisualizar').hide();

                                $("#atividade").append("<option value='"+atividadeId+"' >"+atividadeNome+"</option>");
                                $('#atividade option[value=""]').remove();
                                var selectAtividade = document.getElementById("atividade");
                                geral.sortSelect(selectAtividade);

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
                    }
                }else{
                    $('#dialog').html("Selecione uma atividade para ser removida.");
                    $('#dialog').dialog('open');
                }
                $('#dialog').dialog('close');
                return retorno;
            }

        },
        rules : {
            // I have not defined any of these so disabling the checks will save CPU cycles
            use_max_children : false,
            use_max_depth : false
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
        }

    });
    //Fim da Arvore de Atividades.

    //Inicio Arvore de Recursos.

    $('#arvoreRecurso').tree({
        callback : {

            ondblclk : function(NODE, TREE_OBJ){
                TREE_OBJ.toggle_branch.call(TREE_OBJ, NODE);
                TREE_OBJ.select_branch.call(TREE_OBJ, NODE);
                var papelId = TREE_OBJ.get_node(NODE).attr("id");
                var rel = TREE_OBJ.get_node(NODE).attr("rel");
                if(rel == 'papel'){
                    var atividadeId = TREE_OBJ.parent(NODE).attr("id");
                    atividadeId = atividadeId.substr(17);
                    papelId = papelId.substr(13);
                    $('#papelRecursoViewVal').val(papelId);
                    projeto.selecionarRecurso(papelId);
                    var root = TREE_OBJ.parent(NODE);
                    var atividadeRecursoNome = TREE_OBJ.get_text(root);
                    var papelNome = TREE_OBJ.get_text(NODE);
                    $('#papelRecursoView').text(papelNome);
                    $('#atividadeRecursoView').text(atividadeRecursoNome);
                    $('#visualizarPapeis').text(atividadeRecursoNome);
                    $('#tableVisualizarPapeis').show();
                    $('#tableVisualizarRecursos').show();
                    $('#spanVisualizarRecursos').hide();
                }
            }

        },

        types : {
            "default" : {
                clickable	: true,
                renameable	: false,
                deletable	: false,
                creatable	: true,
                draggable	: false,
                max_children	: -1,
                max_depth	: -1,
                valid_children	: "all"
            },
            "projeto" : {
                valid_children : "atividade",
                icon : {
                    image : $('#webroot').val()+"js/jquery.jstree/processo.gif"
                }
            },
            "atividade" : {
                valid_children : "papel",
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
//Fim arvore de Recursos.
});
