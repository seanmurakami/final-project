import React from 'react'
import { Form, FormGroup, Label, Input, Card, Button } from 'reactstrap'

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.userInput = this.userInput.bind(this)
  }
  userInput(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = {
      eventName: formData.get('event-name'),
      eventLocation: formData.get('event-location')
    }
    e.target.reset()
    this.props.updateEvent(userData)
  }
  render() {
    return (
      <div className="mx-3 d-flex justify-content-center">
        <Card className="shadow col-xl-6 col-lg-7 col-md-10 p-4">
          <h3 className="text-center">Create An Event!</h3>
          <Form onSubmit={ this.userInput }>
            <FormGroup>
              <Label>Event Name:</Label>
              <Input name="event-name" placeholder="Input event name" />
            </FormGroup>
            <FormGroup>
              <Label>Event Location:</Label>
              <Input name="event-location" placeholder="Input event location" />
            </FormGroup>
            <div className="d-flex justify-content-center">
              <Button className="w-50" color="primary">Continue</Button>
            </div>
          </Form>
        </Card>
      </div>
    )
  }
}
