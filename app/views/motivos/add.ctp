<div class="motivos form">
<?php echo $form->create('Motivo');?>
	<fieldset>
 		<legend><?php __('Add Motivo');?></legend>
	<?php
		echo $form->input('tipo');
		echo $form->input('descricao');
		echo $form->input('Selecao');
	?>
	</fieldset>
<?php echo $form->end('Submit');?>
</div>
<div class="actions">
	<ul>
		<li><?php echo $html->link(__('List Motivos', true), array('action' => 'index'));?></li>
		<li><?php echo $html->link(__('List Selecoes', true), array('controller' => 'selecoes', 'action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Selecao', true), array('controller' => 'selecoes', 'action' => 'add')); ?> </li>
	</ul>
</div>
