import React, { Component } from 'react'
import '../css/ReleaseNotesModal.scss'

import Modal from './Modal'
import Button from './Button'

import { connect } from 'react-redux'
import { setLatestReleaseNotes } from '../actions/settingsActions'

const { ipcRenderer } = window.require('electron')

class ReleaseNotesModal extends Component {

  componentDidMount() {
    ipcRenderer.send('electron-updater', 'set-update-channel', this.props.updateChannel)
    ipcRenderer.send('electron-updater', 'check-for-updates')
  }

  render() {
    return (
      <div id="release-notes-modal">
        {require('../../package.json').version !== this.props.latestReleaseNotes ?
          <Modal width={ 600 } height={ 500 }  onClose={ () => { this.props.setLatestReleaseNotes(require('../../package.json').version) } }>
            <h1 style={ { marginTop: "0" } }>Release Notes for Version {require('../../package.json').version}</h1>
            <h2 style={ { color: 'lightgreen' } }>What's new?</h2>
            <hr style={ { borderColor: 'lightgreen' } } />
            <ul>
              <li>Added a highly-requested <b>list view for mods.</b></li>
              <li>Shoutout to the newest Wave-tier Patron: <b>Carize</b>! Thank you all for you continued support!</li>
            </ul>
            <h2 style={ { color: 'salmon' } }>What's fixed?</h2>
            <hr style={ { borderColor: 'salmon' } } />
            <ul>
              <li>You can now <b>exit the song scanning dialog</b> by clicking outside if it becomes stuck.</li>
              <li>Mod categories are now <b>pulled directly from BeatMods.</b></li>
            </ul>
            <br />
            <Button type="primary" onClick={ () => { this.props.setLatestReleaseNotes(require('../../package.json').version) } }>Awesome!</Button>
          </Modal>
        : null}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  latestReleaseNotes: state.settings.latestReleaseNotes,
  updateChannel: state.settings.updateChannel
})

export default connect(mapStateToProps, { setLatestReleaseNotes })(ReleaseNotesModal)