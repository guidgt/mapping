<div class="selecoes form">
<?php echo $form->create('Selecao');?>
	<fieldset>
 		<legend><?php __('Edit Selecao');?></legend>
	<?php
		echo $form->input('usuario_id');
		echo $form->input('artigo_id');
		echo $form->input('situacao_id');
		echo $form->input('id');
		echo $form->input('tipo_id');
		echo $form->input('mapeamento_id');
		echo $form->input('Motivo');
	?>
	</fieldset>
<?php echo $form->end('Submit');?>
</div>
<div class="actions">
	<ul>
		<li><?php echo $html->link(__('Delete', true), array('action' => 'delete', $form->value('Selecao.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $form->value('Selecao.id'))); ?></li>
		<li><?php echo $html->link(__('List Selecoes', true), array('action' => 'index'));?></li>
		<li><?php echo $html->link(__('List Usuarios', true), array('controller' => 'usuarios', 'action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Usuario', true), array('controller' => 'usuarios', 'action' => 'add')); ?> </li>
		<li><?php echo $html->link(__('List Artigos', true), array('controller' => 'artigos', 'action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Artigo', true), array('controller' => 'artigos', 'action' => 'add')); ?> </li>
		<li><?php echo $html->link(__('List Situacoes', true), array('controller' => 'situacoes', 'action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Situacao', true), array('controller' => 'situacoes', 'action' => 'add')); ?> </li>
		<li><?php echo $html->link(__('List Tipos', true), array('controller' => 'tipos', 'action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Tipo', true), array('controller' => 'tipos', 'action' => 'add')); ?> </li>
		<li><?php echo $html->link(__('List Mapeamentos', true), array('controller' => 'mapeamentos', 'action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Mapeamento', true), array('controller' => 'mapeamentos', 'action' => 'add')); ?> </li>
		<li><?php echo $html->link(__('List Motivos', true), array('controller' => 'motivos', 'action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Motivo', true), array('controller' => 'motivos', 'action' => 'add')); ?> </li>
	</ul>
</div>
