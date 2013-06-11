

<script type="text/javascript">
    $(function(){
        $('#tabpanel').tabs();
    });
</script>

<div class="toolbar">
<?php echo $html->link(__('Voltar', true), array('action'=>'index'),array('class'=>'linkbutton linkbtn btn_list'));?></div>

<div id="tabpanel">
    <ul>
        <li>
			<a href="#tab1"><span><?php echo __("Aceitar Trabalho",true) ?></span></a>
			</li>
	
    </ul>
    <div id="tab1">
        <?php echo $form->create('Selecao');?>
		        
        <table cellspacing="0" class="details">
        	<?php
		echo $jquery->input('artigo_text',array('type'=>'text','error' => false,'label'=>'Id do Trabalho(start)','alt'=>'ID Artigo','div'=>false,'before' => '<tr><td class="left">','after' => '</td></tr>','between' => '</td><td class="">'));
		echo $jquery->input('situacao_id',array('label'=>'Status','alt'=>'status','error' => false,'div'=>false,'before' => '<tr><td valign = "top" class="left">','after' => '</td></tr>','between' => '</td><td class="">'));
		echo $jquery->input('Motivo',array('type'=>'select','multiple'=>'multiple','error' => false,'div'=>false,'before' => '<tr><td class="left">','after' => '</td></tr>','between' => '</br></td><td class="">'));
	?>
        <tr><td class="left"></td><td class="right"><?php echo $form->submit(__('Salvar',true),array('style'=>'font-size:11px','class'=>'formbtn btn_salvar'));?></td>
                </tr>
        </table>
        <?php echo $form->end();?>
    </div>
</div>
