<?php
class SituacoesController extends AppController {

	var $name = 'Situacoes';
	var $helpers = array('Html', 'Form', 'Jquery');

	function index() {
		$this->Situacao->recursive = 0;
		$this->set('situacoes', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Registro inválido.', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->set('situacao', $this->Situacao->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Situacao->create();
			if ($this->Situacao->save($this->data)) {
				$this->Session->setFlash(__('Registro salvo com sucesso', true));
				$this->redirect(array('action'=>'index'));
			} else {
				$this->Session->setFlash(__('O registro não pôde ser salvo. Por favor, tente novamente.', true));
			}
		}
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Registro inválido', true));
			$this->redirect(array('action'=>'index'));
		}
		if (!empty($this->data)) {
			if ($this->Situacao->save($this->data)) {
				$this->Session->setFlash(__('Registro salvo com sucesso.', true));
				$this->redirect(array('action'=>'index'));
			} else {
				$this->Session->setFlash(__('O registro não pôde ser salvo. Por favor, tente novamente.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Situacao->read(null, $id);
		}
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Registro inválido', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Situacao->del($id)) {
			$this->Session->setFlash(__('Registro excluído com sucesso', true));
			$this->redirect(array('action'=>'index'));
		}
	}

}
?>