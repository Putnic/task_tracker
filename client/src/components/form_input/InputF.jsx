import React from 'react';

class InputF extends React.Component {
  render() {
    const {children, name, type, value, handleChange} = this.props;
    let inputF = null;

    inputF = (
      <input type={type} className="form-control"
        name={name}
        id={name}
        value={value || ''}
        title={this.props.title || ''}
        onChange={handleChange} 
      />
    );

    if (type === 'textarea') {
      inputF = (
        <textarea className="form-control"
          name={name}
          id={name}
          value={value || ''}
          title={this.props.title || ''}
          onChange={handleChange} 
          rows={this.propsrows}
        />
      );
    }

    if (type === 'select') {
      inputF = (
        <select className="form-control form-control-sm"
          name={name} 
          id={name} 
          value={value || ''}
          title={this.props.title || ''}
          onChange={handleChange} 
        >
          {this.props.options.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      );
    }

    return (
      <React.Fragment>
        <div className="form-group row">
          <label htmlFor={name} className="col-sm-2 col-form-label">
            {children}
          </label>
          <div className="col-sm-10">
            {inputF}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default InputF;
