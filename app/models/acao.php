<?php
class Acao extends AppModel {

	var $name = 'Acao';
	var $validate = array(
		'nome' => array('notempty'),
		'url' => array('notempty')
	);

	var $hasAndBelongsToMany = array(
		'Perfil' => array(
			'className' => 'Perfil',
			'joinTable' => 'acoes_perfis',
			'foreignKey' => 'acao_id',
			'associationForeignKey' => 'perfil_id',
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