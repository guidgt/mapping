<?php
class MotivosSelecao extends AppModel {

	var $name = 'MotivosSelecao';

	var $belongsTo = array(
		'Motivo' => array(
			'className' => 'Motivo',
			'foreignKey' => 'motivo_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Selecao' => array(
			'className' => 'Selecao',
			'foreignKey' => 'selecao_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
     );

}
?>