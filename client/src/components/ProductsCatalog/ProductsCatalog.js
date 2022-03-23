import React from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import Pagination from "../Common/Pagination";
import "./ProductsCatalog.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ProductsCatalog(props) {
  const navigate = useNavigate();
  return (
    <>
      <section className="section-products">
        <div className="container">
          {props.products.length > 0 ? (
            <>
              <div className="row justify-content-center text-center">
                <div className="col-md-8 col-lg-6">
                  <div className="header">
                    <p>
                      <h4>{props.title}</h4>
                    </p>
                    <h2>Popular Products </h2>
                  </div>
                </div>
              </div>
              <div className="row">
                {props.products.map((product) => (
                  <div className="col-md-6 col-lg-4 col-xl-3" key={product.id}>
                    <div className="single-product">
                      <div
                        className="part-1"
                        style={{
                          background:
                            "url(" +
                            BASE_URL +
                            "/" +
                            product.image_url +
                            ") center no-repeat",
                          backgroundSize: "cover",
                          transition: " all 0.3s",
                        }}
                      >
                        <span className="new">new</span>
                        <ul>
                          <li>
                            {" "}
                            <a
                              onClick={() => props.handleAddToCart(product.id)}
                            >
                              <i className="fas fa-shopping-cart"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                props.handleAddToWishList(product.id)
                              }
                            >
                              <i className="fas fa-heart"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                navigate(`/product/view/${product.id}`)
                              }
                            >
                              <i className="fas fa-expand"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="part-2"
                        onClick={() => navigate(`/product/view/${product.id}`)}
                      >
                        <h3 className="product-title">{product.name}</h3>
                        <h4 className="product-old-price">
                          ₹{product.price + 100}
                        </h4>
                        <h4 className="product-price">₹{product.price}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <Pagination
                currPage={props.currPage}
                lastPage={props.lastPage}
                totalPages={props.totalPages}
                handlePagination={props.handlePagination}
              />
            </>
          ) : (
            <div className="header  text-center">
<<<<<<< HEAD
              <h3>No Products Found :(</h3>
=======
              {!props.isLoading && props.products.length === 0 ? 
              <h3>
                No Products Found :(
              </h3>: 
                <Spinner animation="grow"/>
              }
>>>>>>> df5649684580021a19234179c55e70b4501089cb
            </div>
          )}
        </div>
      </section>
    </>
  );
}
