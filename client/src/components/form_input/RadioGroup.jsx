import React from 'react';

class RadioGroup extends React.Component {
  render() {
    const {children, value, name, handleChange, options, styleInputBtn} = this.props;

    return (
      <React.Fragment>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label pt-0">
            {children}
          </label>
          <div className="col-sm-10 btn-group btn-group-toggle">
            {options.map(item => {
              let styleBtn = item.value === value ? (styleInputBtn + ' active') : styleInputBtn;
              return (
              <label className={styleBtn} key={item.value}>
                <input type="radio" 
                  name={name} 
                  id={value} 
                  autoComplete="off" 
                  value={item.value || ''}
                  checked={item.value === value}
                  onChange={handleChange} /> {item.label}
              </label>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RadioGroup;
