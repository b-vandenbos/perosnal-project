import React, {Component} from 'react';
import ReactExport from 'react-export-excel';
import {connect} from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

library.add(faFileDownload);



const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Download extends React.Component {
    render() {
        let {survey, suggested} = this.props.survey;
        return (
            <ExcelFile element={<button className='download-button'><FontAwesomeIcon icon='file-download' /></button>}>
                <ExcelSheet data={survey} name={`${this.props.user.user.company_name} Survey`}>
                    <ExcelColumn label="#" value="index" style={{fill: {patternType: "solid", fgColor: {rgb: "FFFF0000"}}}}/>
                    <ExcelColumn label="Question ID" value="q_id"/>
                    <ExcelColumn label="Dimension" value="q_dimension"/>
                    <ExcelColumn label="Survey Item" value="q_text"/>
                    <ExcelColumn label="Category" value="q_category"/>
                </ExcelSheet>
                <ExcelSheet data={suggested} name={`Suggested For ${this.props.user.user.company_name}`}>
                    <ExcelColumn label="Question ID" value="q_id"/>
                    <ExcelColumn label="Dimension" value="q_dimension"/>
                    <ExcelColumn label="Survey Item" value="q_text"/>
                    <ExcelColumn label="Category" value="q_category"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

const mapState = (reduxState) => {
    return {
        survey: reduxState.survey,
        user: reduxState.user
    }
}

export default connect(mapState)(Download);