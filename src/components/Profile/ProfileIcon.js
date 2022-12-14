import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownOpen: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    return (
      <div className='pa4 tc'>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle tag='span' data-toggle='dropdown' aria-expanded={this.state.dropdownOpen}>
            <img src='http://tachyons.io/img/logo.jpg' className='br4- h4 w3 dib' alt='avatar' />
          </DropdownToggle>
          <DropdownMenu
            end
            className='b--transparent shadow-5'
            style={{ marginTop: '20px', backgroundColor: 'rgba(255,255,0.5)' }}>
            <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
            <DropdownItem onClick={() => this.props.logUserOut('Sign Out')}>Signout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;
