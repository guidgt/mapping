<div class="selecoes view">
<h2><?php  __('Selecao');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Usuario'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $html->link($selecao['Usuario']['nome'], array('controller' => 'usuarios', 'action' => 'view', $selecao['Usuario']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Artigo'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $html->link($selecao['Artigo']['nome'], array('controller' => 'artigos', 'action' => 'view', $selecao['Artigo']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Situacao'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $html->link($selecao['Situacao']['nome'], array('controller' => 'situacoes', 'action' => 'view', $selecao['Situacao']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $selecao['Selecao']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Tipo'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $html->link($selecao['Tipo']['nome'], array('controller' => 'tipos', 'action' => 'view', $selecao['Tipo']['id'])); ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Mapeamento'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $html->link($selecao['Mapeamento']['nome'], array('controller' => 'mapeamentos', 'action' => 'view', $selecao['Mapeamento']['id'])); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<ul>
		<li><?php echo $html->link(__('Edit Selecao', true), array('action' => 'edit', $selecao['Selecao']['id'])); ?> </li>
		<li><?php echo $html->link(__('Delete Selecao', true), array('action' => 'delete', $selecao['Selecao']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $selecao['Selecao']['id'])); ?> </li>
		<li><?php echo $html->link(__('List Selecoes', true), array('action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Selecao', true), array('action' => 'add')); ?> </li>
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
<div class="related">
	<h3><?php __('Related Motivos');?></h3>
	<?php if (!empty($selecao['Motivo'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Tipo'); ?></th>
		<th><?php __('Descricao'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($selecao['Motivo'] as $motivo):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $motivo['id'];?></td>
			<td><?php echo $motivo['tipo'];?></td>
			<td><?php echo $motivo['descricao'];?></td>
			<td class="actions">
				<?php echo $html->link(__('View', true), array('controller' => 'motivos', 'action' => 'view', $motivo['id'])); ?>
				<?php echo $html->link(__('Edit', true), array('controller' => 'motivos', 'action' => 'edit', $motivo['id'])); ?>
				<?php echo $html->link(__('Delete', true), array('controller' => 'motivos', 'action' => 'delete', $motivo['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $motivo['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $html->link(__('New Motivo', true), array('controller' => 'motivos', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
