<?php
class Perfil extends AppModel {

	var $name = 'Perfil';
	var $validate = array(
		'nome' => array('notempty')
	);

	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $hasAndBelongsToMany = array(
		'Acao' => array(
			'className' => 'Acao',
			'joinTable' => 'acoes_perfis',
			'foreignKey' => 'perfil_id',
			'associationForeignKey' => 'acao_id',
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