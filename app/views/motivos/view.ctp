<div class="motivos view">
<h2><?php  __('Motivo');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $motivo['Motivo']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Tipo'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $motivo['Motivo']['tipo']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Descricao'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $motivo['Motivo']['descricao']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<ul>
		<li><?php echo $html->link(__('Edit Motivo', true), array('action' => 'edit', $motivo['Motivo']['id'])); ?> </li>
		<li><?php echo $html->link(__('Delete Motivo', true), array('action' => 'delete', $motivo['Motivo']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $motivo['Motivo']['id'])); ?> </li>
		<li><?php echo $html->link(__('List Motivos', true), array('action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Motivo', true), array('action' => 'add')); ?> </li>
		<li><?php echo $html->link(__('List Selecoes', true), array('controller' => 'selecoes', 'action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Selecao', true), array('controller' => 'selecoes', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Selecoes');?></h3>
	<?php if (!empty($motivo['Selecao'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Usuario Id'); ?></th>
		<th><?php __('Artigo Id'); ?></th>
		<th><?php __('Situacao Id'); ?></th>
		<th><?php __('Id'); ?></th>
		<th><?php __('Tipo Id'); ?></th>
		<th><?php __('Mapeamento Id'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($motivo['Selecao'] as $selecao):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $selecao['usuario_id'];?></td>
			<td><?php echo $selecao['artigo_id'];?></td>
			<td><?php echo $selecao['situacao_id'];?></td>
			<td><?php echo $selecao['id'];?></td>
			<td><?php echo $selecao['tipo_id'];?></td>
			<td><?php echo $selecao['mapeamento_id'];?></td>
			<td class="actions">
				<?php echo $html->link(__('View', true), array('controller' => 'selecoes', 'action' => 'view', $selecao['id'])); ?>
				<?php echo $html->link(__('Edit', true), array('controller' => 'selecoes', 'action' => 'edit', $selecao['id'])); ?>
				<?php echo $html->link(__('Delete', true), array('controller' => 'selecoes', 'action' => 'delete', $selecao['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $selecao['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $html->link(__('New Selecao', true), array('controller' => 'selecoes', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
