<?php
class Motivo extends AppModel {

	var $name = 'Motivo';
        var $displayField = 'descricao';

	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $hasAndBelongsToMany = array(
		'Selecao' => array(
			'className' => 'Selecao',
			'joinTable' => 'motivos_selecoes',
			'foreignKey' => 'motivo_id',
			'associationForeignKey' => 'selecao_id',
			'unique' => true,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'finderQuery' => '',
			'deleteQuery' => '',
			'insertQuery' => ''
		)
	);

}
?>