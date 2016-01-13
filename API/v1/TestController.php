<?php

class TestController
{
    /**
     * Returns a JSON string object to the browser when hitting the root of the domain
     *
     * @url GET /
     */
    public function test()
    {
        return "Hello World";
    }

    /**
    *
    *Return Beliefes
    *
    *@url GET /Beliefs
    **/
    public function beliefs()
    {

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $Res= $sql->query("SELECT * FROM Beliefs ORDER BY ID ASC");
      $arr= array();
      while ($row = $Res->fetch_assoc())
      {
        array_push($arr,$row);
      }

      return $arr;
    }


    /**
    *
    *Return Media
    *
    *@url GET /Media
    **/
    public function media()
    {

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $Res= $sql->query("SELECT * FROM Media ORDER BY ID ASC");
      $arr= array();
      while ($row = $Res->fetch_assoc())
      {
        array_push($arr,$row);
      }
      return $arr;
    }

    /**
    *
    *Return Alerts
    *
    *@url GET /Alerts
    **/
    public function alerts()
    {

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $Res= $sql->query("SELECT * FROM Alerts ORDER BY ID ASC");
      $arr= array();
      while ($row = $Res->fetch_assoc())
      {
        array_push($arr,$row);
      }
      return $arr;
    }


    /**
    *
    *Return API
    *
    *@url GET /API
    **/
    public function API()
    {

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $Res= $sql->query("SELECT * FROM API ORDER BY ID ASC");
      $arr= array();
      while ($row = $Res->fetch_assoc())
      {
        array_push($arr,$row);
      }
      return $arr;
    }
    /**
    *
    *Return API
    *
    *@url GET /Page/$id
    **/
    public function page($id = null)
    {

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $Res= $sql->query("SELECT * FROM Page WHERE ID = ".$id);
      $arr= array();
      while ($row = $Res->fetch_assoc())
      {
        array_push($arr,$row);
      }
      return $arr;
    }

    /**
    *
    *Return News
    *
    *@url GET /News
    **/
    public function news()
    {

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $Res= $sql->query("SELECT * FROM News ORDER BY ID ASC");
      $arr= array();
      while ($row = $Res->fetch_assoc())
      {
        array_push($arr,$row);
      }
      return $arr;
    }

    /**
    *
    *Return Schedule
    *
    *@url GET /Schedule
    **/
    public function Schedule()
    {

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $Res= $sql->query("SELECT * FROM Schedule ORDER BY ID ASC");
      $arr= array();
      while ($row = $Res->fetch_assoc())
      {
        array_push($arr,$row);
      }
      return $arr;
    }

    /**
    *
    *Return Staff
    *
    *@url GET /Staff
    **/
    public function Staff()
    {

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $Res= $sql->query("SELECT * FROM Staff ORDER BY ID ASC");
      $arr= array();
      while ($row = $Res->fetch_assoc())
      {
        array_push($arr,$row);
      }
      return $arr;
    }



    /**
     * Logs in a user with the given username and password POSTed. Though true
     * REST doesn't believe in sessions, it is often desirable for an AJAX server.
     *
     * @url POST /login
     */
    public function login()
    {
        $username = $_POST['username'];
        $password = $_POST['password'];
        return array("success" => "Logged in " . $username);
    }

    /**
     * Gets the user by id or current user
     *
     * @url GET /users/$id
     * @url GET /users/current
     */
    public function getUser($id = null)
    {
        // if ($id) {
        //     $user = User::load($id); // possible user loading method
        // } else {
        //     $user = $_SESSION['user'];
        // }

        return array("id" => $id, "name" => null); // serializes object into JSON
    }

    /**
     * Gets the user by id or current user
     *
     * @url GET /Prayer/$pageNumber
     * @url GET /Prayer/
     *
     */
    public function getRequest($pageNumber=1)
    {
      $count=0;
      $requestPerPage=5;
      $start =0;
      $end=5;
      if($pageNumber!=null)
      {
        $end*=$pageNumber;
        $start=$end-5;
      }

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $Res= $sql->query("SELECT Name, Permissions, Request, Prayers, Submitted, ID FROM PrayerRequest Where Submitted >= curdate() - INTERVAL DAYOFWEEK(curdate())+12 DAY ORDER BY ID Desc");//AND Submitted < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY

      $posts=array();
      while ($row = $Res->fetch_assoc())
      {
        if($row["Permissions"]==2)
        {//hide name
          $row["Name"]="Anonymous";
        }

        if($row["Permissions"]==3)
        {
          //donothing hidden request
        }
        else if($count>=$start &&$count<$end)
        {

          array_push($posts,$row);
        }
        $count++;
      }

    //  if($pageNumber==1)
    //  {

        $arr= array(
          "page" => ++$pageNumber
          );


          $arr["Post"]=$posts;
      //}else {

      //  $arr= array(
        //  "page" => 2
          //  );
        //$arr["Post"]=$posts;
      //}

      return $arr;
    }

    /**
     * Gets the user by id or current user
     *
     * @url PUT /Prayer/$RequestID/$count
     */
    public function PrayedFor($RequestID,$count)
    {

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };
      $count=$count+1;
      $qu=("UPDATE PrayerRequest set Prayers ='".$count."' WHERE ID ='".$RequestID."'");
      if ($sql->query($qu) === TRUE) {
        echo "New record updated successfully";
      } else {
              echo "Error: " . $qu . "<br>" . $sql->error;
              }

              $sql->close();
    }
    /**
     * Gets the user by id or current user
     *
     * @url POST /Prayer
     */
    public function addRequest($data)
    {
      //send data to sql.

      if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $qu=("INSERT INTO PrayerRequest(Name, Email, Phone, Permissions, Request, Prayers, Testimony, Answered, Submitted) VALUES ('". $data->Name."','". $data->Email."','". $data->Phone."','". $data->Permissions."','". $data->Requst."','0','','',CURDATE())");

      if ($sql->query($qu) === TRUE) {
        echo "New record created successfully";
      } else {
              echo "Error: " . $qu . "<br>" . $sql->error;
              }

              $sql->close();

              $msg="Hello,\n\n ".$data->Name." would like to be Prayed for".  $data->Requst.", and can be contected by phone: ".$data->Phone." or Email: ".$data->Email."\n Thanks.";
              $msg=wordwrap($msg,70);
              mail("elmgroveag@gmail.com","Prayer Request",$msg);
    }
    /**
     * Gets the user by id or current user
     *
     * @url POST /Contact
     */

    public function ContactRequest($data)
    {
      //send data to sql.
          if ($sql->connect_errno)
      {
        return "Failed to connect to MySQL: (" . $sql->connect_errno . ") " . $sql->connect_error;
      };

      $qu=("INSERT INTO Contact(Name, Email, Subject, Message) VALUES ('". $data->Name."','". $data->Email."','". $data->Subject."','". $data->Message."')");

      if ($sql->query($qu) === TRUE) {
        echo "New record created successfully";
      } else {
              echo "Error: " . $qu . "<br>" . $sql->error;
              }

              $sql->close();

              $msg="Hello,\n\n ".$data->Name." would like to be contacted in reguards to ". $data->Subject.", and has left the folowing message.\n".$data->Message." They can be reached at ".$data->Email."\n Thanks.";
              $msg=wordwrap($msg,70);
              mail("elmgroveag@gmail.com","Contact Request",$msg);
          }



    /**
     *
     * @url POST /users
     * @url PUT /users/$id
     */
    public function saveUser($id = null, $data)
    {
        // ... validate $data properties such as $data->username, $data->firstName, etc.
        // $data->id = $id;
        // $user = User::saveUser($data); // saving the user to the database
        $user = array("id" => $id, "name" => null);
        return $user; // returning the updated or newly created user object
    }
}
