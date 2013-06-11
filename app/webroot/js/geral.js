$(function(){
    $("#accordion").accordion();
    $('#accordionRecurso').accordion();
    $('#accordionAtividadesTarefas').accordion();
    $('#tabpanel').tabs();
    $("#atividade").append("<option value='0' >Nova Atividade...</option>");


//não permite arrastar objetos para dentro do campo

             $("textarea").unbind().bind('drop', function(){
          return false;
    });
    

//chama contador de caracteres restantes no textarea          
       $("textarea").keyup(function(){


        geral.countxt($(this).attr('maxLength'), $(this).val().length,'#'+$(this).attr('id')+'Count');
                
       });
       
       $("textarea").mousemove(function(){
 
        geral.countxt($(this).attr('maxLength'), $(this).val().length,'#'+$(this).attr('id')+'Count');
                
       });

});


function Geral(controllerId, controller, model){
    this.modificouAtividade = false;
    this.controller = controller;
    this.controllerId = controllerId;
    this.model = model;
    this.recursosProjeto;
    geral = this;

    this.setModificouAtividade = function(modificouAtividade){
        this.modificouAtividade = modificouAtividade;
    }

    this.getModificouAtividade = function(){
        return this.modificouAtividade;
    }

    this.setRecursosProjeto = function(recursosProjeto){
        this.recursosProjeto = recursosProjeto;
    }

    this.getRecursosProjeto = function(){
        return this.recursosProjeto;
    }

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

    this.adicionarAtividade = function(val_atividade, id_papel) {
        var n = $("input[id^='"+id_papel+"']:checked");

        if(val_atividade == 0){
            $('#cadAtividade').dialog('open');
        }else{
            var papeisJoin = '|';
            if(n.length > 0){
                papeisJoin = n[0].value;
                for(var i=1;i<n.length;i++){
                    papeisJoin = papeisJoin + '|' + n[i].value;
                }
            }
            
            papeisJoin = $.base64Encode(papeisJoin);
            $.ajax({
                type: "get",
                url: $('#webroot').val() +'ajax'+'/add_atividade/'+this.getControllerId()+'/'+this.getModel()+'/'+val_atividade+'/'+papeisJoin,
                success: function(msg){
                  
                    var valor = eval("(" + msg + ")");
                    if(valor["erro"]){
                  
                  $('#flashMessage').html(valor["erro"]);
                        $('#msginfo').fadeIn(500);
                        setTimeout("$('#msginfo').fadeOut(500)",4000);
                    }else{
                        //Cria na arvore atual a Atividade já cadastrada no banco com as suas NovaSubAtividades(Array-> children).
                        $.tree.focused().create(valor , "#item_1", 'inside');

                        //$('#arvore').html(msg); Recarrega arvore inteira(retorna arvore correta, porém com alguns problemas);
                        $('#atividade option[value='+val_atividade+']').remove();
                        $('#modalAtividadeParent option[value='+val_atividade+']').remove();
                        $("input:checkbox[id^='"+ id_papel +"']").each(function(){
                            $(this).attr("checked",false);
                        });
                        //Marca a variavel modificouAtividade como verdadeira para recarregar a arvore de recurso(Projeto).
                        geral.modificouAtividade = true;
                    }
                }
            });
        }
    }

    this.editarAtividade = function(atividades_model_id, id_papel){
        var n = $("input[id^='"+ id_papel +"']:checked");

//        if(n.length>0){
            var papeisJoin = '|';
            if(n.length > 0){
                papeisJoin = n[0].value;
                for(var i=1;i<n.length;i++){
                    papeisJoin = papeisJoin + '|' + n[i].value;
                }
            }
            papeisJoin = $.base64Encode(papeisJoin);

            var consultar = true;
            if(this.getModel()=='Projeto'){
                if(this.verificaRecursoAssociado(atividades_model_id, papeisJoin)==false){
                    this.selecionarPapel(atividades_model_id, "selecionar_papel");
                    consultar = false;
                }
            }
            
            if(consultar){
                $.ajax({
                    type: "get",
                    url: $('#webroot').val() + 'ajax' +'/editar_atividade/'+atividades_model_id+'/'+papeisJoin+'/'+this.getModel()+'/ajax/json/0/'+this.controllerId,
                    success: function(msg){
                        //Marca a variavel modificouAtividade como verdadeira para recarregar a arvore de recurso.
                        geral.modificouAtividade = true;
                        $('#accordion').accordion( 'activate' , 0 );
                        $('#tableVisualizar').hide();
                        $('#flashMessage').html(msg);
                        $('#msginfo').fadeIn(500);
                        setTimeout("$('#msginfo').fadeOut(500)",4000);
                    }
                });
            }
            
//        }else{
//            $('#flashMessage').html("Adicione pelo menos um papel a sua atividade.");
//            $('#msginfo').fadeIn(500);
//            setTimeout("$('#msginfo').fadeOut(500)",4000);
//        }
    }

      this.salvarResponsavelAtividade = function(atividade, recurso){

        var retorno = $.ajax({
            type: "get",
            async: false,
            dateType: 'html',
            url: $('#webroot').val() + 'ajax' +'/editar_responsavel_atividade/'+atividade+'/'+recurso+'/'+this.getModel(),
            success: function(msg){

                if (msg == 0){
                    $('#flashMessage').html("Erro ao salvar o Responsável pela Atividade");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);

                }else if(msg == 1){

                    $('#flashMessage').html("O Responsável pela Atividade foi salvo com sucesso.");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
            }

            }
        })

        return retorno;
    };





    this.removeAtividade = function(atividade, sequenciamento){
        var retorno = $.ajax({
            type: "get",
            async: false,
            dateType: 'html',
            url: $('#webroot').val() + 'ajax' +'/deletar_atividade/'+this.getControllerId()+'/'+atividade+'/'+sequenciamento+'/'+this.getModel()
        }).responseText;
        
        return retorno;
    };

    this.updateSequencia = function(vetor, atividadeId, parentId){
        var retorno = $.ajax({
            type: "get",
            async: false,
            url: $('#webroot').val() + 'ajax' +'/mover_atividade/'+this.getControllerId()+'/'+this.model+'/'+vetor+'/'+atividadeId+'/'+parentId
        }).responseText;
        
        return retorno;
    };

    this.arr2jsonToBase64 = function($arr){
        var $ret = '{';
        var $key,$chave,$val;
        for($key in $arr){
            $val = $arr[$key];
            $key = $key.replace("'","\\'");
            $val = $val.replace("'","\\'");

            if(isNaN($key)){
                $chave = "'" + $key + "'";
            }else{
                $chave=$key;
            }
            $ret += " " + $chave + ":'" + $val + "',";
        }
        $ret = $ret.substring(0,$ret.length-1);
        $ret += '}';
        $ret = $.base64Encode($ret);
        return $ret;
    }

    this.carregarAtividades = function(atividade, idSelect, idTr){
        $.ajax({
            type: "get",
            async: false,
            url: $('#webroot').val() + 'ajax' +'/get_atividades/'+this.getControllerId()+'/'+atividade+'/'+idSelect+'/'+this.getModel()+'/'+this.getController()+'/get_atividades',
            success: function(msg){
                $('#'+idTr).html(msg);
                if(idSelect == "atividade"){
                    $("#atividade").append("<option value='0' >Nova Atividade...</option>");
                    $('#atividade option[value=""]').remove();
                }
            }
        });
    }

    this.mudarAtividade = function(removida){
        var novoId = $('#modalNovaAtividade').val();
        $.ajax({
            type: "get",
            url: $('#webroot').val()+ 'ajax' +'/mover_alocacoes_tempo/'+this.getControllerId()+'/'+removida+'/'+novoId,
            success: function(msg){
                $('#flashMessage').html(msg);
                $('#msginfo').fadeIn(500);
                setTimeout("$('#msginfo').fadeOut(500)",4000);
                $('#modAtividade').dialog('close');
                $('html, body').animate({scrollTop: 0});
            }
        });

    }


    this.novaAtividade = function(){
        var nome = $('#modalAtividadeNome').val();
        var descricao = $('#modalAtividadeDescricao').val();


        if(nome != '' && descricao != ''){
            $.ajax({
                type: "post",
                async: false,
                data: $("#AtividadeAddForm").serialize(),
                url: $('#webroot').val()+ 'ajax' +'/nova_atividade',
                success: function(msg){
                    $('#accordion').accordion( 'activate' , 0 );
//                    alert(msg);
                    if (isNaN(msg)){
                        $('#flashMessage').html(msg);
                        $('#msginfo').fadeIn(500);
                        setTimeout("$('#msginfo').fadeOut(500)",4000);
                    }else{
                        $('#modalAtividadeNome').val("");
                        $('#modalAtividadeDescricao').val("");
                        $('#modalAtividadeParent option').val("");
                        $('#cadAtividade').dialog('close');
                        geral.carregarAtividades(msg, 'atividade', 'selectAtividade');
                        geral.carregarAtividades(msg, 'modalAtividadeParent', 'selectAtividadeModal');

                    }
                }
            });
        }else{
            $('#flashMessage').html("Os campos nome e descrição devem ser preenchidos.");
            $('#msginfo').fadeIn(500);
            setTimeout("$('#msginfo').fadeOut(500)",4000);
        }
    }

    this.verificaRemocaoTree = function(){
        if($.tree.focused().remove() == false){
            $('#flashMessage').html("Selecione uma Atividade para ser removida.");
            $('#msginfo').fadeIn(500);
            setTimeout("$('#msginfo').fadeOut(500)",4000);
        }else{
            //Marca a variavel modificouAtividade como verdadeira para recarregar a arvore de recurso.
            geral.modificouAtividade = true;
        }
    }

    this.selecionarPapel = function(atividades_model_id, render){
        $.ajax({
            type: "get",
            async: true,
            url: $('#webroot').val()+ 'ajax' +'/selecionar_papel/'+atividades_model_id+'/'+this.getModel()+'/'+this.getController()+'/'+ render,
            success: function(msg){
                $('#tableVisualizar').show();
                $('#spanVisualizar').hide();
                $('#selectPapelView').html(msg);
              }
        });
    };


       this.selecionarResponsavel = function(atividades_model_id, render){
        $.ajax({
            type: "get",
            async: true,
            url: $('#webroot').val()+ 'ajax' +'/selecionar_responsavel_atividade/'+atividades_model_id+'/'+this.getModel()+'/'+this.getController()+'/'+ render,
            success: function(msg){
                $('#tableVisualizar').show();
                $('#spanVisualizar').hide();
                $('#selectResponsavelAtividadeView').html(msg);
              }
        });
    };


    this.getCustosRecurso = function(){
 
       
       if($("#recurso_id").val() == "")
            return '';
        $.ajax({
            url: $('#webroot').val() + 'ajax' +'/get_custos_by_recurso/'+$("#recurso_id").val()+'/'+this.getController()+'/get_custos_recurso',
            success: function(msg){
                $('#custos').html(msg);
            }
        });
    }

    this.getRecursosBySetor = function(setorId,recurso,registro){
        if(setorId == undefined){
            setorId = 0;
        }

        if(recurso == undefined){
            recurso = null;
        }
        
        if(registro == undefined){
            registro = null;
        }

        $.ajax({
            type:"get",
            async: false,
            url:$('#webroot').val() + 'ajax' +'/get_recursos_by_setor/'+this.getController()+'/get_recursos_by_setor/'+setorId+'/'+recurso+'/'+registro,
            success:function(msg)
            {
                $('#recursoId').html(msg);
            }
        });
    }

    this.getRegistro = function(datares){
        //verificar se existe justificativa que seja abono ou redução de dia
        //se existir, não alocar tempo.
        $.ajax({
            type:"get",
            url:$('#webroot').val()+'ajax/get_registro/'+ datares,
            success:function(msg)
            {

                if (msg == 0){
                    $('#flashMessage').html("Você não possui horas registradas para este dia!");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                //return [false,'datepickunable'];
                }else if(msg == 1){
                    //return [false,'datepickunable'];
                    $('#flashMessage').html("É necessário ter um turno fechado para alocar horas!");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                }else if (msg == 2){
                    //return [true,'datepickalocated'];
                    window.location = $('#webroot').val()+'alocacao_tempos/add/'+datares;
                }
            }
        });
    }

    this.atualizaOcioso = function(registro){
        $.ajax({
            type:"get",
            async: false,
            url:$('#webroot').val()+'ajax/calcula_tempo_ocioso/'+registro,
            success:function(msg)
            {
                if(msg<'00:00'){
                    alert("msg");
                }
                $('#ocioso').html('<input type="text" style="width: 65px;" value="'+msg+'" onfocus="this.blur()" readonly="1" id="tempo_ocioso" class="trTempoOcioso" name="data[AlocacaoTempo][tempo_ocioso]">');
            }
        });
    }

    this.getIntervalo = function(hora_alocada, nova_alocacao)
    {
        nova_alocacao = $.base64Encode(nova_alocacao);
        hora_alocada = $.base64Encode(hora_alocada);
        retorno = null;
        $.ajax({
            type:"get",
            async:false,
            url:$('#webroot').val()+'ajax/get_intervalo/'+hora_alocada+'/'+nova_alocacao,
            success:function(msg)
            {
                retorno = msg;
            }
        });
        return retorno;
    }

    this.getAtividades = function(projeto_id, selected, recurso){
        
        $.ajax({
            type:"get",
            async:false,
            url:$('#webroot').val()+'ajax/get_atividades_by_projetos/'+this.getController()+'/get_atividades_by_projetos/'+projeto_id+'/'+recurso+'/'+ selected+'/',
            success:function(msg)
            {
                $('#atividadeByProjeto').html(msg);
            }
        });
    }

    this.getTarefasByServico = function(servico_id, selected, recurso){
        //$("#servico").val()
        $.ajax({
            type:"get",
            url:$('#webroot').val()+'ajax/get_tarefas_by_servicos/'+this.getController()+'/get_tarefas_by_servicos/'+servico_id+'/'+recurso+'/'+selected,
            success:function(msg)
            {
                $('#tarefa').html(msg);
            }
        });
    }
   

    this.calculaPeriodoHora = function(fim, inicio)
    {
        vt1 = fim.split(":");
        vt2 = inicio.split(":");


        if(vt1.length != 2){
            vt1[0] = 0;
            vt1[1] = 0;

        }

        if(vt2.length != 2){
            vt2[0] = 0;
            vt2[1] = 0;

        }
        
        var totalMinutosFim = eval(vt1[0]) * 60 + eval(vt1[1]);
        var totalMinutosInicio = eval(vt2[0]) * 60 + eval(vt2[1]);
        resultadoMinutos = totalMinutosFim - totalMinutosInicio;


        h = parseInt(resultadoMinutos / 60);
        resultadoMinutos = resultadoMinutos - (h * 60);
        m = resultadoMinutos;
        if(h<10)
            h = '0'+h;
        if(m<10)
            m = '0'+m;

        retorno = h+':'+m;

        return retorno;
    }

    this.salvarCusto = function(){
        $.ajax({
            type:"post",
            async: false,
            data: $("#CustoAddForm").serialize(),
            url:$('#webroot').val()+'ajax/salvar_custo/'+this.getController()+'/salvar_custo',
            success:function(msg)
            {
                if(parseInt(msg)== 0){
                    $('#flashMessage').html("A operação não pode ser concluída, Verifique os problemas e tente novamente.");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                }
                else if(parseInt(msg) == 2){
                    $('#flashMessage').html("A operação não pode ser concluída, já existe um Custo com a data informada.");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                }
                else if(parseInt(msg) == 1)
                {
                    $('#flashMessage').html("O Custo foi salvo com sucesso!");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                } else if(parseInt(msg) == 3)
                {
                    $('#flashMessage').html("Data bloqueada para alterações. Uma solicitação foi gerada, favor aguardar aprovação.");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                }
            }
            
        });
        this.getCustosRecurso();
    }

    this.deletaCusto = function(){
        $.ajax({
            type:"get",
            async: false,
            url:$('#webroot').val()+'ajax/delete_custo/'+$('#identificador').val()+'/'+this.getController()+'/delete',
            success:function(msg)
            {
                $('#flashMessage').html(msg);
                $('#msginfo').fadeIn(500);
                setTimeout("$('#msginfo').fadeOut(500)",4000);
            }
        });
        
        this.getCustosRecurso();
    }

    this.getProjetosBySetor = function(div, setor, stRecurso, stProjeto, tab)
    {
        if(setor == '')
            setor = null;

        var attRecurso = stRecurso;
        if(stRecurso == '')
            attRecurso = null;

        var attProjeto = stProjeto;
        if(stProjeto == '')
            attProjeto = null;

        $.ajax({
            type:"get",
            async: false,
            url:$('#webroot').val()+'ajax/get_projetos_servicos_by_setor/'+setor+'/'+
            attRecurso+'/'+attProjeto+'/'+tab+'/'+this.getController()+'/get_projetos_servicos_recursos',
            success:function(msg)
            {
                $('#'+div).html(msg);
            }
        });
    }

    this.listarRecursosProjeto = function(projeto_id){
        if(projeto_id != ""){
            $.ajax({
                url: $('#webroot').val() + 'ajax' +'/get_recurso_projeto/'+projeto_id,
                async: false,
                dataType: 'json',
                success: function(json){
                    var retorno = json.results;
                    $('#cliente').val(retorno.Cliente.sigla);
                    $('#dataInicio').val(retorno.Projeto.data_inicio);
                    $('#dataFim').val(retorno.Projeto.data_fim);
                    var recursos = retorno.ProjetosRecurso;
                    geral.setRecursosProjeto(recursos);
                    $("#tbodyRecursos").html("");
                    $('#setorTr').show();
                    for(var r in recursos){
                        geral.addRecursoTabela(recursos[r].id, recursos[r].Recurso.nome, recursos[r].Recurso.Setor[0].nome, recursos[r].ProjetosRecursosPeriodo);
                    }
                }
            });
        }else{
            $('#cliente').val("");
            $('#dataInicio').val("");
            $('#dataFim').val("");
            $('#setorTr').hide();
            $("#tbodyRecursos").html("");
            this.setRecursosProjeto("");
        }
    }

    this.listarRecursosProjetoPorSetor = function(setor_id){
        $("#tbodyRecursos").html("");
        var recursos = this.getRecursosProjeto();
        for(var r in recursos){
            if(setor_id == recursos[r].Recurso.Setor[0].id || setor_id == ""){
                geral.addRecursoTabela(recursos[r].id, recursos[r].Recurso.nome, recursos[r].Recurso.Setor[0].nome, recursos[r].ProjetosRecursosPeriodo);
            }
        }
    }

    this.addRecursoTabela = function(num, recurso, setor, projetosRecursosPeriodo){
        var template;
        if(projetosRecursosPeriodo != ""){
            template = $('#xmpaddrecurso').html().replace(/#num#/g,num);
        }else{
            template = $('#xmpaddrecursoComPeriodo').html().replace(/#num#/g,num);
        }

        template = template.replace(/#recurso#/g,recurso);
        template = template.replace(/#setor#/g,setor);
        $template = template;
        $("#tbodyRecursos").append($template);
    }

    this.sortSelect = function(obj){
        var o = new Array();
        for (var i=0; i<obj.length; i++){
            o[o.length] = new Option(obj.options[i].text, obj.options[i].value, obj.options[i].defaultSelected, obj.options[i].selected);
        }
        o = o.sort(
            function(a,b){
                if ((a.text+"") < (b.text+"")) {
                    return -1;
                }
                if ((a.text+"") > (b.text+"")) {
                    return 1;
                }
                return 0;
            }
            );

        for (var i=0; i<o.length; i++){
            obj.options[i] = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
        }
    }

    this.verificaAcompanhamento = function(val){
        if (val.attr('checked')){
            $('#critico').attr('disabled','');
        }else{
            $('#critico').attr('disabled',true);
            $('#critico').attr('checked',false);

        }
    }

    this.treeRemoveAll = function(obj){
        $.each(obj, function(i){

        })
    }


    this.getAllRecursosSetores = function(setorId, recurso,registro){

      if((setorId == '')||(typeof(setorId) == "undefined")){
            setorId = null;
        }
        
          if((recurso == "")||(typeof(recurso) == "undefined")){
            recurso = null;
        }

        if((registro == "")||(typeof(registro) == "undefined")){
            registro = null;
        }

        $.ajax({
            type:"get",
            url:$('#webroot').val() + 'ajax' +'/get_recursos_setor/'+this.getController()+'/get_recursos_by_setor/'+setorId+'/'+recurso+'/'+registro,
            success:function(msg)
            {
                $('#recursoId').html(msg);
            }
        });
    }

    this.verificaRecursoAssociado = function(atividades_projetos_id, papeis){
        var retorno = true;
        $.ajax({
            type: "get",
            url: $('#webroot').val() +'ajax'+'/getQtdeRecursoAtividadePapel/'+atividades_projetos_id+'/'+papeis,
            async: false,
            success: function(msg){
                if(msg > 0){
                    if(confirm("Você está tentando excluir papel que tem recurso associado. Deseja continuar?")){
                        retorno = true;
                    }else{
                        retorno = false;
                    }
                }
            }
        });
        return retorno;
    }

     this.getJustificativasRecurso = function(recurso){
        if(recurso == ""){
            return '';
        }
        $.ajax({
            url: $('#webroot').val() + 'ajax' +'/get_justificativas_by_recurso/'+recurso+'/'+this.getController()+'/get_justificativas_recurso',
            success: function(msg){
                $('#justificativas').html(msg);
            }
        });
    }

       this.getJustificativaGeral = function(checked){
           if(checked != 1){
           $("#justificativas").html("");
           return "";
       }
        $.ajax({
            url: $('#webroot').val() + 'ajax' +'/get_justificativa_geral/'+this.getController()+'/get_justificativas_recurso',
            success: function(msg){
                $('#justificativas').html(msg);
            }
        });
    }

       this.salvarJustificativa = function(){
        
    
        $.ajax({
            type:"post",
            async: false,
            data: $("#JustificativaAddForm").serialize(),
            url:$('#webroot').val()+'ajax/salvar_justificativa/'+this.getController()+'/salvar_justificativa',
            success:function(msg){
                   
                  if(parseInt(msg)== 0){
                 $('#flashMessage').html("A operação não pode ser concluída, Verifique os problemas e tente novamente.");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                }
//                else if(parseInt(msg) == 2){
//                    $('#flashMessage').html("A operação não pode ser concluída. Já existe uma Ocorrência de Abono para o período informado.");
//                    $('#msginfo').fadeIn(500);
//                    setTimeout("$('#msginfo').fadeOut(500)",4000);
//                }
                else if(parseInt(msg) == 1){
                   $('#flashMessage').html("A Ocorrência de Abono foi salva com sucesso!");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                }
            }
        });

          if($("#RecId").val() != ""){
             this.getJustificativasRecurso($("#RecId").val());
        }else{
              this.getJustificativaGeral($("#justificativaGeral").val());
        }
    }

        this.deletaJustificativa = function(identificador){
        
        $.ajax({
            type:"get",
            async: false,
            url:$('#webroot').val()+'ajax/delete_justificativa/'+identificador+'/'+this.getController()+'/delete',
            success:function(msg)
            {
                $('#flashMessage').html(msg);
                $('#msginfo').fadeIn(500);
                setTimeout("$('#msginfo').fadeOut(500)",4000);
            }
        });
              if($("#recursoId").val() != ""){
             this.getJustificativasRecurso($("#recursoId").val());
        }else{
              this.getJustificativaGeral($("#justificativaGeral").val());
        }
    }




    this.getRecursosSetorStatus = function(setor,status){

    if((setor == "")||(typeof(setor)== 'undefined')){
        setor = null;
    }
    if((status == "")||(typeof(status)== 'undefined')){
        status = null;
    }
        $.ajax({
         type:"get",
            url:$('#webroot').val() + 'ajax' +'/recursos_setores_status/'+this.getController()+'/recursos_by_setor_status/'+setor+'/'+status,
             success: function(msg){
                $('#idRecurso').html(msg);
            }
        });
    }

     this.getProjetosServicosBySetor = function(setor,statusProjeto){

       if((setor == "")||(typeof(setor)== 'undefined')){
        setor = null;
    }
    if((statusProjeto == "")||(typeof(statusProjeto)== 'undefined')){
        statusProjeto = null;
    }


        $.ajax({
            type:"get",
            async: false,
               url:$('#webroot').val() + 'ajax' +'/get_projetos_servicos_by_setor/'+this.getController()+'/get_projetos_servicos_by_setor/'+setor+'/'+statusProjeto,
            success:function(msg){
                $('#projetosServicos').html(msg);
            }
        });
    }

        this.validaTipoJustificativa = function(tipoJustifcativa){

      $.ajax({
            type:"get",
            async: false,
               url:$('#webroot').val() + 'ajax' +'/valida_tipo_justificativa/'+this.getController()+'/valida_tipo_justificativa/'+tipoJustifcativa,
            success:function(msg){
                if(parseInt(msg) == 1){
               $('#hora_reduzida').show();
                }else{
               $('#hora_reduzida').hide();
                }
              $('#reduz_hora').val(parseInt(msg));
            }
        });
    }


       

    this.countxt = function(max,tsize,field){

//caso um maxLegth não seja passado, considera como 100
if((max == null)|| (max == 'undefined') || (max == '') || (max < 1)){
    max = 100;
}

        var txtsize = parseInt(tsize, 10);
        var restante = max-txtsize;

        $(field).html('Restam '+restante+' caracteres');

       if(restante < 16){
             $(field).css('color','red');
             $(field).css('font-weight','bold');
       }else{
             $(field).css('color','black');
             $(field).css('font-weight','normal');
       }
    
    }



    this.validaAlocacaoInicioProjetoServico = function (dataAlocacao,atividadeTarefa){
        
       var retorno = false;
        
        $.ajax({
            type:"get",
            async: false,
            dataType: "json",
            url: $('#webroot').val() + 'ajax' +'/valida_alocacao_inicio_projeto_servico/'+dataAlocacao+'/'+atividadeTarefa,
            success: function(msg){
               
               retorno = msg;
            }
        });
           
       return retorno;
    
    }
    
 
 
 this.salvarCargosRecurso = function(){
        $.ajax({
            type:"post",
            async: false,
            data: $("#CargosRecursoAddForm").serialize(),
            url:$('#webroot').val()+'ajax/salvar_cargos_recurso/'+this.getController()+'/salvar_cargos_recurso',
            success:function(msg)
            {
                if(parseInt(msg)== 0){
                    $('#flashMessage').html("A operação não pode ser concluída, Verifique os problemas e tente novamente.");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                }
                else if(parseInt(msg) == 2){
                    $('#flashMessage').html("A operação não pode ser concluída, já existe um Cargo com a data informada.");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                }
                else if(parseInt(msg) == 1)
                {
                    $('#flashMessage').html("O Cargo do Recurso foi salvo com sucesso!");
                    $('#msginfo').fadeIn(500);
                    setTimeout("$('#msginfo').fadeOut(500)",4000);
                } 
            }
            
        });
        this.getCargosRecurso();
        
    }
        
    this.getCargosRecurso = function(){
 
         if($("#recurso_id").val() == "")
            return '';
        $.ajax({
            url: $('#webroot').val() + 'ajax' +'/get_cargos_recurso/'+$("#recurso_id").val()+'/'+this.getController()+'/get_cargos_recurso',
            success: function(msg){
              $("#divCargos").html(msg);
            }
        });
    }
    
    this.deleteCargosRecurso = function(){
        $.ajax({
            type:"get",
            async: false,
            url:$('#webroot').val()+'ajax/delete_cargos_recurso/'+$('#identificador').val()+'/'+this.getController()+'/delete',
            success:function(msg)
            {
                $('#flashMessage').html(msg);
                $('#msginfo').fadeIn(500);
                setTimeout("$('#msginfo').fadeOut(500)",4000);
            }
        });
        
        this.getCargosRecurso();
    }
    
    
    
}

