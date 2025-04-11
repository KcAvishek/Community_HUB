import React from 'react'

const FormTable = () => {

  return (
        <div className="box form-section">
          <h2>Form Management</h2>
          <div className="form-management-container">
            <div className="form-table-wrapper">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th className="user-name-column">USER NAME</th>
                    <th className="status-column">STATUS</th>
                    <th className="email-column">EMAIL</th>
                    <th className="feedback-column">FEEDBACK</th>
                    <th className="actions-column"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="user-name-cell">
                      <div className="user-avatar">A</div>
                      <span>Abhishek K.C.</span>
                    </td>
                    <td>
                      <span className="status-badge status-accepted">
                        Accepted
                      </span>
                    </td>
                    <td>abhi@Gmail.com</td>
                    <td>Great service!</td>
                    <td>
                      <div className="action-menu">
                        <button className="action-button">...</button>
                        <div className="status-dropdown">
                          <button className="status-option status-accepted">
                            Accepted
                          </button>
                          <button className="status-option status-pending">
                            Pending
                          </button>
                          <button className="status-option status-rejected">
                            Rejected
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="user-name-cell">
                      <div className="user-avatar">R</div>
                      <span>Rahul Rana</span>
                    </td>
                    <td>
                      <span className="status-badge status-pending">
                        Pending
                      </span>
                    </td>
                    <td>rana@Gmail.com</td>
                    <td>Waiting for more info</td>
                    <td>
                      <div className="action-menu">
                        <button className="action-button">...</button>
                        <div className="status-dropdown">
                          <button className="status-option status-accepted">
                            Accepted
                          </button>
                          <button className="status-option status-pending">
                            Pending
                          </button>
                          <button className="status-option status-rejected">
                            Rejected
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="user-name-cell">
                      <div className="user-avatar">N</div>
                      <span>Niraj thapa</span>
                    </td>
                    <td>
                      <span className="status-badge status-rejected">
                        Rejected
                      </span>
                    </td>
                    <td>thapa1@Gmail.com</td>
                    <td>Not eligible</td>
                    <td>
                      <div className="action-menu">
                        <button className="action-button">...</button>
                        <div className="status-dropdown">
                          <button className="status-option status-accepted">
                            Accepted
                          </button>
                          <button className="status-option status-pending">
                            Pending
                          </button>
                          <button className="status-option status-rejected">
                            Rejected
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="user-name-cell">
                      <div className="user-avatar">A</div>
                      <span>Anp gurung</span>
                    </td>
                    <td>
                      <span className="status-badge status-accepted">
                        Accepted
                      </span>
                    </td>
                    <td>anupe@Gmail.com</td>
                    <td>Perfect fit</td>
                    <td>
                      <div className="action-menu">
                        <button className="action-button">...</button>
                        <div className="status-dropdown">
                          <button className="status-option status-accepted">
                            Accepted
                          </button>
                          <button className="status-option status-pending">
                            Pending
                          </button>
                          <button className="status-option status-rejected">
                            Rejected
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="user-name-cell">
                      <div className="user-avatar">K</div>
                      <span>Kenab K.C.</span>
                    </td>
                    <td>
                      <span className="status-badge status-accepted">
                        Accepted
                      </span>
                    </td>
                    <td>Kenab@Gmail.com</td>
                    <td>Excellent candidate</td>
                    <td>
                      <div className="action-menu">
                        <button className="action-button">...</button>
                        <div className="status-dropdown">
                          <button className="status-option status-accepted">
                            Accepted
                          </button>
                          <button className="status-option status-pending">
                            Pending
                          </button>
                          <button className="status-option status-rejected">
                            Rejected
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
export default FormTable