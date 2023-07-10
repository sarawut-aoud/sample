<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CRUD_Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->render_main('home/login');
    }
    public function preview()
    {
        $this->renderview('home/view');
    }
}
