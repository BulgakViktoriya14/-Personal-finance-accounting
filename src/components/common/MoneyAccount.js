import React from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";
import {variablesStyle} from '../style-components/variablesStyle';

export const MoneyAccountStyle = styled.div`
    @media screen and (max-width: 768px) {
    	padding: 20px;
    }
   
    display: flex;
    justify-content: space-between;
    align-items: center;
	margin: auto 0 0 0;
    background-color: ${variablesStyle.colors.colorBlack};
    padding: 30px 10px;
    color: ${variablesStyle.colors.colorWhite};
`;

export const MoneyAccountTitleStyle = styled.h3`
	font-size: 18px;
	line-height: 18px;
	
	@media screen and (max-width: 768px) {
		font-size: 16px;
		line-height: 16px;
	}
`;

export const MoneyAccountSumStyle = styled.span`
	font-size: 20px;
    line-height: 20px;
    font-family: 'Montserrat-SemiBold', sans-serif;
	
	@media screen and (max-width: 768px) {
		font-size: 20px;
		line-height: 20px;
	}
`;

class MoneyAccount extends React.Component {
	render() {
		return (
			<MoneyAccountStyle className="money-account">
				<MoneyAccountTitleStyle className="money-account_title">On your account:</MoneyAccountTitleStyle>
				<MoneyAccountSumStyle className="money-account_sum"><span className="number">{this.props.sum}</span> BYN.</MoneyAccountSumStyle>
			</MoneyAccountStyle>
		)
	}
}

function mapStateToProps(state) {
	return {
		sum: state.userInfo.userSum
	}
}

export default connect(mapStateToProps, null)(MoneyAccount);