<?php
if (!defined('BASEPATH'))  exit('No direct script access allowed');

/**
 * [ Controller File name : Dashboard.php ]
 * สำหรับ Front-End
 */
class Process extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
    }


    public function Login()
    {
    }
    public function Logout()
    {
        $this->session->destroy();
        redirect('login/login', 'refresh');
    }
}
/*---------------------------- END Controller Class --------------------------------*/
