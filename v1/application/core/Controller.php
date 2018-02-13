<?php
	class Controller
	{
        /**
         * Variables with the default template and footer settings.
         */
        protected $template = 'default.php';
		protected $footer = '';

        /**
         * Variables that decide over visual aspects of the view.
         */
        protected $browser_title = '';
		protected $title = '';
		protected $description = '';

		/**
	    * Imports a model from the 'application/models/*' directory.
        * Also capable of returning the newly imported instance.
	    *
	    * @param    string      The name of the model you wish to import.
	    * @param    boolean     If this boolean is set to true, the function will return an instance of the imported model.
	    * @return   object      An new instance of the desired model- if $_return is declared true.
	    */
		public function model($_model, $_return = false)
		{
			require_once 'application/models/' . $_model . '.php';
			if($_return) return new $_model(); else return null;
		}


		/**
		 * Loads the specified view from the 'application/views/*' directory.
		 * The function adds the .php, and loads the view into the template by default.
		 *
		 * @param   string  Location of the view (without .php).
		 * @param 	array 	Data to be used on the view.
		 */
        public function view($_view, $_data = [])
		{
            # When no footer is declared, check if a file corresponding to *.footer.php exists.
            if(empty($this->footer) && file_exists('application/views/' . $_view . '.footer.php'))
				$this->footer = $_view . '.footer';

			extract($_data, EXTR_PREFIX_SAME, "duplicate_");

			if(!empty($this->template) && file_exists('application/templates/' . $this->template))
				die(require_once('application/templates/' . $this->template));
            require_once('application/views/' . $_view . '.php');
		}
	}