<?php
class UsuariosController extends Controller {

	var $name = 'Usuarios';
        var $uses = array('Acao','Usuario');
        var $helpers = array('Html', 'Form', 'Jquery');

	function index() {
            if(!empty($this->data)){
                

                $usuario = $this->Usuario->find('first', array('conditions'=>array('usuario'=>  $this->data['Usuario']['usuario'])));
                if($usuario['Usuario']['senha'] == $this->data['Usuario']['senha']){
                    $perfil_id = $usuario['Usuario']['perfil_id'];
                     $fields = array('DISTINCT url', 'label', 'grupo');
                     $conditions = array();
                    

                    $this->Acao->recursive = 2;
                    $acoes = $this->Acao->find('all', array(
                        'fields'=>$fields, 
                        'conditions'=>$conditions, 
                        'order' => array('grupo', 'label')
                    ));
                    
                    if( !empty ($acoes)){
                        foreach ($acoes as $key => $value) {
                            $url = $value['Acao']['url'];
                            unset ($value['Acao']['url']);
                            $usuario['Acao'][$url] = $value['Acao'];
                            unset ($acoes[$key]);
                        }
                    }$this->Session->write('Usuario',$usuario);
                    $this->redirect('/');
                } else {

                    $this->data['Usuario']['senha'] = '';
                    $this->Session->setFlash(__('Usuário/Senha inválidos, tente novamente.', true));
                }
            } else {
                if($this->Session->read('Usuario'))
                    $this->redirect('/');
            }
	}
        function logout(){
            $this->Session->destroy();
            $this->redirect(array('action'=>'index'));
        }


}
?>