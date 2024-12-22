/*import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getAllOrders } from '../actions/orderActions';

const CartAllOrders = () => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const orderState = useSelector(state => state.getAllOrdersReducer);
  const { orders, error, loading } = orderState;

  const [productName, setProductName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [collaboratorName, setCollaboratorName] = useState('');
  const [clientCode, setClientCode] = useState('');

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleOrderDateChange = (e) => {
    setOrderDate(e.target.value);
  };

  const handleCollaboratorNameChange = (e) => {
    setCollaboratorName(e.target.value);
  };

  const handleClientCodeChange = (e) => {
    setClientCode(e.target.value);
  };

  const filterOrders = () => {
    return orders.filter(order =>
      order.orderItems.some(item => item.name.toLowerCase().includes(productName.toLowerCase())) &&
      (orderDate ? order.createdAt.slice(0, 10) === orderDate : true) &&
      (order.name ? order.name.toLowerCase().includes(collaboratorName.toLowerCase()) : true) &&
      (order.codeClient ? order.codeClient.toLowerCase().includes(clientCode.toLowerCase()) : true)
    );
  };

  const generateOrderPDF = (order) => {
    const doc = new jsPDF();
    const logoImg = new Image();
    logoImg.src = '../logo.jpg'; // Ensure the path is correct

    // Add the image to the PDF after it loads
    logoImg.onload = () => {
      // Add the image at the top right of the document
      doc.addImage(logoImg, 'JPG', 160, 10, 30, 20); // x, y, width, height
      doc.setFontSize(25); // Set font size
      doc.setFont("helvetica", "bold"); // Set font to Helvetica and make it bold
      doc.setTextColor('#003f7e'); // Set text color to blue (RGB format)
      doc.text(`Bon de commande N° ${order._id.slice(1, 6)}`, 15, 25);

      // Reset font settings to default for the next lines
      doc.setFontSize(12); // Reset font size to default (if default is 12)
      doc.setFont("helvetica", "normal"); // Reset font to Helvetica normal
      doc.setTextColor(0, 0, 0); // Reset text
      // Define the table columns and rows
      const columns = ["", ""];
      const rows = [
        ["Collaborateur :", order.name],
        ["Code client :", order.codeClient],
        ["Raison social :", order.raisonSocial],
        ["Tel :", order.tel],
        ["Adresse :", order.adresse],
        ["Date :", order.createdAt.slice(0, 10)]
      ];

      // Add the table to the document
      doc.autoTable({
        startY: 40,
        head: [columns],
        body: rows,
        theme: 'plain', // To remove table borders
        styles: { cellPadding: 1, fontSize: 10 },
        columnStyles: {
          0: { cellWidth: 40 }, // Set custom width for the first column
          1: { cellWidth: 100 } // Set custom width for the second column
        }
      });

      const tableColumns = ['Name', 'Variant', 'Price (DH)', 'Quantity'];
      const tableRows = order.orderItems.map(item => [
        item.name,
        item.variant,
        `${item.price} DH`,
        item.quantity
      ]);

      const totalPrice = order.orderItems.reduce((total, item) => total + item.price, 0);
      const totalQuantity = order.orderItems.reduce((total, item) => total + item.quantity, 0);

      doc.autoTable({
        startY: 110,
        head: [tableColumns],
        body: tableRows,
        foot: [['', 'Total', totalPrice + ' DH', totalQuantity]]
      });

      doc.save(`order__details.pdf`);

      toast.success('Your order PDF is exported!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false
      });
    };
  };

  const generateGlobalPDF = () => {
    const doc = new jsPDF();
    const logoImg = new Image();
    logoImg.src = '../logo.jpg'; // Ensure the path is correct

    // Add the image to the PDF after it loads
    logoImg.onload = () => {
      // Add the image at the top right of the document
      doc.addImage(logoImg, 'JPG', 160, 10, 30, 20); // x, y, width, height
      doc.setFontSize(25); // Set font size
      doc.setFont("helvetica", "bold"); // Set font to Helvetica and make it bold
      doc.setTextColor('#003f7e'); // Set text color to blue (RGB format)
      doc.text(`Bon de commande global`, 15, 25);

      // Reset font settings to default for the next lines
      doc.setFontSize(12); // Reset font size to default (if default is 12)
      doc.setFont("helvetica", "normal"); // Reset font to Helvetica normal
      doc.setTextColor(0, 0, 0); // Reset text

      const tableColumns = ['Order ID', 'Date', 'Item Name', 'Collaborateur', 'Price (DH)', 'Quantity'];
      const globalTableRows = [];

      const filteredOrders = filterOrders(); // Apply the same filtering logic

      filteredOrders.forEach(order => {
        globalTableRows.push([order.codeClient + '  ' + order.raisonSocial]);
        order.orderItems.forEach(item => {
          const { name, price, quantity } = item;
          globalTableRows.push([order._id.slice(1, 6), order.createdAt.slice(0, 10), name, order.name, `${price} DH`, quantity]);
        });
      });

      const totalPrice = filteredOrders.reduce((acc, order) =>
        acc + order.orderItems.reduce((total, item) => total + item.price, 0), 0);

      const totalQuantity = filteredOrders.reduce((acc, order) =>
        acc + order.orderItems.reduce((total, item) => total + item.quantity, 0), 0);

      doc.autoTable({
        startY: 70,
        head: [tableColumns],
        body: globalTableRows,
        foot: [['', '', '', 'Total', totalPrice + ' DH', totalQuantity]]
      });

      doc.save('global_order_details.pdf');
      toast.success('Your order PDF is exported!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false
      });
    };
  };

  return (
    <div className="container justify-content-center col-12 col-xl-12 col-md-12 mt-5 mx-auto orders-details">
      <div className="mb-4 pb-3">
        <h2>All orders</h2>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name"
          value={productName}
          onChange={handleProductNameChange}
          className="form-control shadow-lg bg-body rounded"
        />
        <input
          type="date"
          value={orderDate}
          onChange={handleOrderDateChange}
          className="form-control mt-3 shadow-lg bg-body rounded"
        />
        <input
          type="text"
          placeholder="Search by collaborator name"
          value={collaboratorName}
          onChange={handleCollaboratorNameChange}
          className="form-control mt-3 shadow-lg bg-body rounded"
        />
        <input
          type="text"
          placeholder="Search by client code"
          value={clientCode}
          onChange={handleClientCodeChange}
          className="form-control mt-3 shadow-lg bg-body rounded"
        />
      </div>
      {loading && <Loading />}
      {error && <Loading />}
      {orders && (
        <>
          {filterOrders().map(order => (
            <div className="cart-items col-12 col-md-12 mt-5" key={order._id}>
              <hr className="mx-auto col-1 col-xl-12 col-lg-12" style={{ width: '300px' }} />
              <h3 className="pt-1 mx-auto" style={{ color: '#800000' }}>Order N° {order._id.slice(1, 6)}</h3>
              <h3 className="pt-1 mx-auto" style={{ color: '#003f7e' }}>Collaborateur : {order.name}</h3>
              <div className="col-xl-12 mb-5 mx-auto">
                <h2>Total price: {order.orderAmount} DH</h2>
                <button
                  onClick={() => generateOrderPDF(order)}
                  className="btn btn-primary"
                  type="button"
                  style={{ fontSize: '25px', border: '0px' }}
                >
                  Cette commande en &nbsp;
                  <i className="fa fa-file-pdf-o"></i>
                </button>
              </div>
              <p className="card-text text-start" style={{ fontSize: '14px' }}>Code: {order.codeClient}</p>
              <p className="card-text text-start" style={{ fontSize: '14px' }}>Raison social: {order.raisonSocial}</p>
              {order.orderItems.map(item => (
                <div className='' key={item._id}>
                  <div style={{ border: 'none' }} className="card mb-3">
                    <div className="g-0 flex-container col-12 col-md-12">
                      <div className="col-md-5">
                        <img src={item.image} style={{ height: '150px', width: '220px' }} className="img-fluid rounded-start col-4 col-md-4" alt={item.name} />
                      </div>
                      <div className="col-7 col-md-7">
                        <div className="card-body col-12 col-md-12">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text" style={{ fontSize: '13px' }}>Price: {item.price} DH</p>
                          <p className="card-text" style={{ fontSize: '13px' }}>Quantity: {item.quantity}</p>
                          <p className="card-text" style={{ fontSize: '13px' }}>Date: {order.createdAt.slice(0, 10)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        <hr className="mx-auto col-1 col-xl-12 col-lg-12" style={{ width: '300px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
      <button onClick={generateGlobalPDF} style={{ fontSize: '25px', border: '0px' }} className="btn btn-primary mt-2" type="button">
        All commandes en &nbsp;
        <i className="fa fa-file-pdf-o"></i>
      </button>
    </div>
  );
};

export default CartAllOrders;
*/