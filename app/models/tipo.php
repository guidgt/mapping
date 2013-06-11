<?php
class Tipo extends AppModel {

	var $name = 'Tipo';
        var $displayField = 'descricao';

	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $hasOne = array(
		'Selecao' => array(
			'className' => 'Selecao',
			'foreignKey' => 'tipo_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

	var $hasMany = array(
		'Selecao' => array(
			'className' => 'Selecao',
			'foreignKey' => 'tipo_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		)
	);

}
?>