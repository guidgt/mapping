<?php
class MotivosController extends AppController {

	var $name = 'Motivos';
	var $helpers = array('Html', 'Form');

	function index() {
		$this->Motivo->recursive = 0;
		$this->set('motivos', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->flash(__('Invalid Motivo', true), array('action'=>'index'));
		}
		$this->set('motivo', $this->Motivo->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Motivo->create();
			if ($this->Motivo->save($this->data)) {
				$this->flash(__('Motivo saved.', true), array('action'=>'index'));
			} else {
			}
		}
		$selecoes = $this->Motivo->Selecao->find('list');
		$this->set(compact('selecoes'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->flash(__('Invalid Motivo', true), array('action'=>'index'));
		}
		if (!empty($this->data)) {
			if ($this->Motivo->save($this->data)) {
				$this->flash(__('The Motivo has been saved.', true), array('action'=>'index'));
			} else {
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Motivo->read(null, $id);
		}
		$selecoes = $this->Motivo->Selecao->find('list');
		$this->set(compact('selecoes'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->flash(__('Invalid Motivo', true), array('action'=>'index'));
		}
		if ($this->Motivo->del($id)) {
			$this->flash(__('Motivo deleted', true), array('action'=>'index'));
		}
	}

}
?>