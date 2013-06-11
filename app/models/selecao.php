<?php
class Selecao extends AppModel {

	var $name = 'Selecao';
        var $displayField = 'artigo_id';

	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $belongsTo = array(
		'Usuario' => array(
			'className' => 'Usuario',
			'foreignKey' => 'usuario_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Artigo' => array(
			'className' => 'Artigo',
			'foreignKey' => 'artigo_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Situacao' => array(
			'className' => 'Situacao',
			'foreignKey' => 'situacao_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Tipo' => array(
			'className' => 'Tipo',
			'foreignKey' => 'tipo_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Mapeamento' => array(
			'className' => 'Mapeamento',
			'foreignKey' => 'mapeamento_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

	var $hasAndBelongsToMany = array(
		'Motivo' => array(
			'className' => 'Motivo',
			'joinTable' => 'motivos_selecoes',
			'foreignKey' => 'selecao_id',
			'associationForeignKey' => 'motivo_id',
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