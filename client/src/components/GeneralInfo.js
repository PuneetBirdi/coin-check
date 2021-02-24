import React from 'react'
import styled from 'styled-components'

const GeneralInfo = () => {
    return (
      <GeneralInfoStyled>
        <MainHeader>
          <DetailContainer>
            <Price>$45345.23</Price>
            <PriceCaption>BTC - USD</PriceCaption>
          </DetailContainer>
          <TableContainer>
            <Table>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
            </Table>
            <Table>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
              <tr>
                <Metric>Volume</Metric>
                <Value>325234.00</Value>
              </tr>
            </Table>
          </TableContainer>
        </MainHeader>
        <ChartContainer></ChartContainer>
      </GeneralInfoStyled>
    );
}

export default GeneralInfo

const GeneralInfoStyled = styled.section`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: white;
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 1rem;

  display: flex;
  flex-direction: column;
`;

const MainHeader = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`
const DetailContainer = styled.div`
    width: auto;
`
const TableContainer = styled.div`
    width: auto;
    display: flex;
`
const Price = styled.h1`
    padding: 0;
    margin: 0;
    font-size: 2.0rem;
    font-weight: 900;
`
const PriceCaption = styled.small`
    padding: 0;
    margin: 0;
    font-size: 0.75rem;
    display: block;
    width: 100%;
    text-align: right;
    color: gray;
`

const ChartContainer = styled.section`
    background-color: purple;
    flex: 1;
`

const Table = styled.table`
    font-size: 0.75rem;
    margin-left: 2.0rem;
`

const Metric = styled.td`
    padding-right: 2.5rem;
`
const Value = styled.td`
`