<div class="motivos index">
<h2><?php __('Motivos');?></h2>
<p>
<?php
echo $paginator->counter(array(
'format' => __('Page %page% of %pages%, showing %current% records out of %count% total, starting on record %start%, ending on %end%', true)
));
?></p>
<table cellpadding="0" cellspacing="0">
<tr>
	<th><?php echo $paginator->sort('id');?></th>
	<th><?php echo $paginator->sort('tipo');?></th>
	<th><?php echo $paginator->sort('descricao');?></th>
	<th class="actions"><?php __('Actions');?></th>
</tr>
<?php
$i = 0;
foreach ($motivos as $motivo):
	$class = null;
	if ($i++ % 2 == 0) {
		$class = ' class="altrow"';
	}
?>
	<tr<?php echo $class;?>>
		<td>
			<?php echo $motivo['Motivo']['id']; ?>
		</td>
		<td>
			<?php echo $motivo['Motivo']['tipo']; ?>
		</td>
		<td>
			<?php echo $motivo['Motivo']['descricao']; ?>
		</td>
		<td class="actions">
			<?php echo $html->link(__('View', true), array('action' => 'view', $motivo['Motivo']['id'])); ?>
			<?php echo $html->link(__('Edit', true), array('action' => 'edit', $motivo['Motivo']['id'])); ?>
			<?php echo $html->link(__('Delete', true), array('action' => 'delete', $motivo['Motivo']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $motivo['Motivo']['id'])); ?>
		</td>
	</tr>
<?php endforeach; ?>
</table>
</div>
<div class="paging">
	<?php echo $paginator->prev('<< '.__('previous', true), array(), null, array('class'=>'disabled'));?>
 | 	<?php echo $paginator->numbers();?>
	<?php echo $paginator->next(__('next', true).' >>', array(), null, array('class' => 'disabled'));?>
</div>
<div class="actions">
	<ul>
		<li><?php echo $html->link(__('New Motivo', true), array('action' => 'add')); ?></li>
		<li><?php echo $html->link(__('List Selecoes', true), array('controller' => 'selecoes', 'action' => 'index')); ?> </li>
		<li><?php echo $html->link(__('New Selecao', true), array('controller' => 'selecoes', 'action' => 'add')); ?> </li>
	</ul>
</div>
