import React from 'react'
import DeleteEvent from './modal-delete'
import { Badge, Button, Card, CardHeader, CardText, CardBody, CardFooter, Row, Col, Table } from 'reactstrap'

const styles = {
  width: {
    maxWidth: '50rem',
    opacity: '0.9'
  },
  description: {
    maxWidth: '38rem'
  },
  icon: {
    right: '2rem'
  }
}

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.removeEvent = this.removeEvent.bind(this)
    this.addLike = this.addLike.bind(this)
    this.removeListActivity = this.removeListActivity.bind(this)
    this.removeListFood = this.removeListFood.bind(this)
    this.removeLodge = this.removeLodge.bind(this)
  }
  removeEvent(e) {
    const id = e.target.id
    this.props.deleteEvent(id)
  }
  addLike(e) {
    const { id, lodges } = this.props.selectedEvent
    const address = e.target.id
    const copyLodge = [...lodges]
    copyLodge.map(lodge => {
      return lodge.locationAddress === address ? lodge.like++ : lodge
    })
    const newLodges = Object.assign({}, {lodges: copyLodge})
    this.props.patchEvent(id, newLodges)
  }
  removeListActivity(e) {
    const { id, activities } = this.props.selectedEvent
    const oldList = [...activities]
    const listID = parseInt(e.target.id, 10)
    const filteredList = oldList.filter(item => listID !== item.id)
    const newList = Object.assign({}, {activities: filteredList})
    this.props.patchEvent(id, newList)
  }
  removeListFood(e) {
    const { id, food } = this.props.selectedEvent
    const oldList = [...food]
    const listID = parseInt(e.target.id, 10)
    const filteredList = oldList.filter(item => listID !== item.id)
    const newList = Object.assign({}, {food: filteredList})
    this.props.patchEvent(id, newList)
  }
  removeLodge(e) {
    const { id, lodges } = this.props.selectedEvent
    const oldLodges = [...lodges]
    const lodgeID = parseInt(e.target.id, 10)
    const filteredLodges = oldLodges.filter(lodge => lodgeID !== lodge.id)
    const newLodges = Object.assign({}, {lodges: filteredLodges})
    this.props.patchEvent(id, newLodges)
  }
  render() {
    const { eventName, eventLocation, eventDescription, startDate, endDate, lodges, activities, food, id } = this.props.selectedEvent
    return (
      <div className="mx-2 mb-5">
        <Card className="container font-weight-light text-center px-0" style={ styles.width }>
          <CardHeader>
            <CardText className="font-weight-light" tag="h1">{ eventName }</CardText>
            <CardText><i className="fas fa-location-arrow mr-2 fa-sm"></i>{ eventLocation }</CardText>
          </CardHeader>
          <CardBody className="pb-3">
            <CardText className="mx-auto" style={ styles.description }>{ eventDescription }</CardText>
            <CardText tag="h4"><i className="fas fa-calendar-alt mr-2"></i>When</CardText>
            <Row className="d-flex justify-content-center mx-auto mb-3">
              <Col className="col-md-auto" xs={6}>
                <CardText className="mb-0">Start Date</CardText>
                <CardText className="border rounded p-2 bg bg-light">{ startDate }</CardText>
              </Col>
              <Col className="col-md-auto" xs={6}>
                <CardText className="mb-0">End Date</CardText>
                <CardText className="border rounded p-2 bg bg-light">{ endDate }</CardText>
              </Col>
            </Row>
            <CardText tag="h4" className="mb-3"><i className="fas fa-home mr-2"></i>Lodging<i className="far fa-plus-square fa-xs text-secondary ml-2"></i></CardText>
            <Row className="d-flex justify-content-center mb-2">
              {
                lodges.map((lodge, index) => {
                  const likeStatus = lodge.like === 0 ? 'text-secondary' : 'text-info'
                  return (
                    <Col key={index} className="mb-2" sm={6}>
                      <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between">
                          <Badge color="secondary">{ lodge.like }</Badge>
                          { lodge.locationAddress }
                          <i id={lodge.locationAddress}
                            className={`fas fa-thumbs-up ${likeStatus}`}
                            onClick={ this.addLike }>
                          </i>
                        </CardHeader>
                        <CardBody>
                          <Row className="d-flex justify-content-around">
                            <CardText className="text-success mb-0">{`Cost: $${lodge.locationCost}`}</CardText>
                            <CardText className="mb-0">{`Type: ${lodge.locationType}`}</CardText>
                          </Row>
                        </CardBody>
                        <CardFooter>
                          <i id={ lodge.id } onClick={ this.removeLodge } className="fas fa-minus-circle text-secondary float-right"></i>
                        </CardFooter>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
            <Row>
              <Col sm={6}>
                <CardText tag="h4"><i className="fas fa-utensils mr-2 mb-2"></i>Food</CardText>
                <Table className="border">
                  <tbody>
                    {
                      food.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="d-flex align-items-center justify-content-center">
                              { item.value }
                              <i
                                id={ item.id }
                                style={ styles.icon }
                                onClick={ this.removeListFood }
                                className="fas fa-times text-secondary position-absolute"></i>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </Col>
              <Col sm={6}>
                <CardText tag="h4"><i className="fas fa-hiking mr-2 mb-2"></i>Activities</CardText>
                <Table className="border">
                  <tbody>
                    {
                      activities.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="d-flex align-items-center justify-content-center">
                              { item.value }
                              <i
                                id={ item.id }
                                style={ styles.icon }
                                onClick={ this.removeListActivity }
                                className="fas fa-times text-secondary position-absolute"></i>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="d-flex align-items-center justify-content-between">
              <Button href="#" className="ml-2">Back</Button>
              <DeleteEvent id={id} removeEvent={ this.removeEvent }/>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}
