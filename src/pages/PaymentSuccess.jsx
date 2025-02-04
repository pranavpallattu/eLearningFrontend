import React from 'react';
import AdminHeader from '../components/AdminHeader';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function PaymentSuccess() {
  return (
    <>
      <AdminHeader />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '80%', maxWidth: '500px' }}>
          <Card.Body>
            <Card.Title>Payment Successful</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Thank you for your payment</Card.Subtitle>
            <Card.Text>
              Your transaction has been completed successfully. You can view your order details or continue shopping.
            </Card.Text>
           <Link to={'/dashboard'}><button className='btn btn-info p-2'>Go to Dashboard</button></Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default PaymentSuccess;
