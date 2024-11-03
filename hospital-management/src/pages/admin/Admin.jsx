import React, { useEffect, useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './admin.css'
import AuthContext from '../../AuthContext.jsx'
import Cookies from 'js-cookie';
import Navbar from '../../components/navbar/navbar';
import Fake from '../../utility/Fake';
import Sidebar_admin from '../../components/sidebar_admin/Sidebar_admin';

const Admin = () => {
  const { adashboardState, signup, backend_url } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const userType = Cookies.get('userType');
  const id = parseInt(Cookies.get('id'), 10);
  if (isNaN(id)) {
    console.error('Invalid admin ID');
  }
  useEffect(() => {
    if (!token || userType !== 'ADMIN') {
      navigate('/');
    }
  }, [token])
  const handleRegDoc = async () => {
        const data = {
            firstName: document.getElementById('dfirstName').value,
            lastName: document.getElementById('dlastName').value,
            dob: document.getElementById('ddob').value,
            education: document.getElementById('deducation').value,
            gender: document.getElementById('dgender').value,
            phone: document.getElementById('dphone').value,
            email: document.getElementById('demail').value,
            post: document.getElementById('dpost').value,
            department: document.getElementById('ddepartment').value,
            specialization: document.getElementById('dspecialization').value,
            password: document.getElementById('dpassword').value
        }
        if(await signup(data, "doctor")) {
            alert('Doctor registered successfully');
            window.location.reload();
        } else {
            alert('Invalid credentials');
        }
    }
    const handleRegChem = async () => {
        const data = {
            firstName: document.getElementById('cfirstName').value,
            lastName: document.getElementById('clastName').value,
            dob: document.getElementById('cdob').value,
            gender: document.getElementById('cgender').value,
            phone: document.getElementById('cphone').value,
            email: document.getElementById('cemail').value,
            password: document.getElementById('cpassword').value
        }
        if(await signup(data, "chemist")) {
            alert('Chemist registered successfully');
            window.location.reload();
        } else {
            alert('Invalid credentials');
        }
    }

    const [machineryID, setMachineryID] = useState(-1);
    const handleMachinerySubmit = async (e) => {
        e.preventDefault();
        const method = machineryID === -1 ? 'POST' : 'PUT';
        const endpoint = machineryID === -1 ? `${backend_url}/machinery` : `${backend_url}/machinery/${machineryID}`;
        const reqData = {
            name: document.getElementById('mname').value,
            cost: document.getElementById('mcost').value
        }
        const response = await fetch(endpoint, {
            method,
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData)
        })
        if(response.status === 201 || response.status === 200) {
            setMachineryID(-1);
            alert('Success');
            window.location.reload();
        } else {
            alert('Error');
        }
    }
    // fetch Machinery
    const should_fetch_machinery = useRef(true);
    const [machineryList, setMachineryList] = useState([]);
    useEffect(() => {
        if(should_fetch_machinery.current) {
            fetchMachinery();
            should_fetch_machinery.current = false;
        }
    }, [])
    const fetchMachinery = async () => {
        const response = await fetch(`${backend_url}/machinery`);
        const data = await response.json();
        setMachineryList(data); 
    }
    const handleEditMachinery = (machinery) => {
        setMachineryID(machinery.machineID);
        document.getElementById('mname').value = machinery.name;
        document.getElementById('mcost').value = machinery.cost;
    }
  return (
    <div>
            <Navbar />
            <Fake />
    <div className='pdashboard'>
        <Sidebar_admin />
      
      <div className="main-content">
        {adashboardState === 0 && <>
          <h1 className="dashboard-header">Register Doctor</h1>
          <div className="login_div">
            <h1>Details</h1>
            <form onSubmit={handleRegDoc} className="login_form">
                <div className="login_div">
                    <label htmlFor="dfirstName" className="login_label">First Name : </label>
                    <input className='login_input' id='dfirstName' type="text" placeholder="First Name" />
                </div>
                <div className="login_div">
                    <label htmlFor="dlastName" className="login_label">Last Name : </label>
                    <input className='login_input' id='dlastName' type="text" placeholder="Last Name" />
                </div>
                <div className="login_div">
                    <label htmlFor="ddob" className="login_label">Date of Birth : </label>
                    <input className='login_input' id='ddob' type="date" placeholder="Date of Birth" />
                </div>
                <div className="login_div">
                    <label htmlFor="deducation" className="login_label">Education : </label>
                    <input type="text" className="login_input" placeholder='Education' id='deducation' />
                </div>
                <div className="login_div">
                    <label htmlFor="dgender" className="login_label">Gender : </label>
                    <select className='login_select' id = 'dgender'>
                        <option value = "Male">Male</option>
                        <option value = "Female">Female</option>
                    </select>
                </div>
                <div className="login_div">
                    <label htmlFor="dphone" className="login_label">Phone : </label>
                    <input type="text" className="login_input" placeholder='Phone' id='dphone' />
                </div>
                <div className="login_div">
                    <label htmlFor="demail" className="login_label">Email : </label>
                    <input className='login_input' id='demail' type="text" placeholder="Email" />
                </div>
                <div className="login_div">
                    <label htmlFor="dpost" className="login_label">Post : </label>
                    <input className='login_input' id='dpost' type="text" placeholder="Post" />
                </div>
                <div className="login_div">
                    <label htmlFor="ddepartment" className="login_label">Department : </label>
                    <input className='login_input' id='ddepartment' type="text" placeholder="Department" />
                </div>
                <div className="login_div">
                    <label htmlFor="dspecialization" className="login_label">Specialization : </label>
                    <input className='login_input' id='dspecialization' type="text" placeholder="Specialization" />
                </div>
                <div className="login_div">
                    <label htmlFor="dpassword" className="login_label">Password : </label>
                    <input className='login_input' id='dpassword' type="password" placeholder="Password" />
                </div>
                <button className='login_button' type="submit">Register</button>
            </form>
          </div>
        </>}
        {adashboardState === 1 && <>
          <h1 className="dashboard-header">Register Chemist</h1>
          <div className="login_div">
            <h1>Details</h1>
            <form onSubmit={handleRegChem} className="login_form">
                <div className="login_div">
                    <label htmlFor="cfirstName" className="login_label">First Name : </label>
                    <input className='login_input' id='cfirstName' type="text" placeholder="First Name" />
                </div>
                <div className="login_div">
                    <label htmlFor="clastName" className="login_label">Last Name : </label>
                    <input className='login_input' id='clastName' type="text" placeholder="Last Name" />
                </div>
                <div className="login_div">
                    <label htmlFor="cdob" className="login_label">Date of Birth : </label>
                    <input className='login_input' id='cdob' type="date" placeholder="Date of Birth" />
                </div>
                <div className="login_div">
                    <label htmlFor="cgender" className="login_label">Gender : </label>
                    <select className='login_select' id = 'cgender'>
                        <option value = "M">Male</option>
                        <option value = "F">Female</option>
                    </select>
                </div>
                <div className="login_div">
                    <label htmlFor="cphone" className="login_label">Phone : </label>
                    <input type="text" className="login_input" placeholder='Phone' id='cphone' />
                </div>
                <div className="login_div">
                    <label htmlFor="cemail" className="login_label">Email : </label>
                    <input className='login_input' id='cemail' type="text" placeholder="Email" />
                </div>
                <div className="login_div">
                    <label htmlFor="cpassword" className="login_label">Password : </label>
                    <input className='login_input' id='cpassword' type="password" placeholder="Password" />
                </div>
                <button className='login_button' type="submit">Register</button>
            </form>
          </div>
        </>}
        {adashboardState === 2 && <>
          <h1 className="dashboard-header">Machinery</h1>
          <div className="login_div">
            <h1>{machineryID === -1 ? 'Add' : 'Edit'}</h1>
            <form onSubmit={handleMachinerySubmit} className="login_form">
                <div className="login_div">
                    <label htmlFor="mname" className="login_label">Machine Name : </label>
                    <input className='login_input' id='mname' maxLength="50" required type="text" placeholder="Machine Name" />
                </div>
                <div className="login_div">
                    <label htmlFor="mcost" className="login_label">Cost : </label>
                    <input className='login_input' id='mcost' type="number" placeholder="Cost" required />
                </div>
                <button className="login_button" type='submit'>{machineryID === -1 ? 'Add' : 'Edit'}</button>
            </form>
          </div>
            <h1>Machinery List</h1>
            <ul>
                {machineryList.map((machinery) => (
                    <li key={machinery.machineID}>
                        {machinery.name} - ${machinery.cost}{' '}
                        <button onClick={() => handleEditMachinery(machinery)}>Edit</button>
                    </li>
                ))}
            </ul>
        </>}
        {adashboardState === 3 && <>
          <h1 className="dashboard-header">Requests</h1>
        </>}
      </div>
    </div>
    </div>
  )
}

export default Admin;
