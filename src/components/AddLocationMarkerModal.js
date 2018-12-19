import React from 'react'
import { View, StyleSheet, TextInput, Modal, Button } from 'react-native'
import IconButton from './common/IconButton';

class AddLocationMarkerModal extends React.Component {

    render() {
        const { modalVisible, handleModalVisible } = this.props
        return (
            <Modal visible={modalVisible}
                // style={styles.modal}
                transparent={true}
                position='center'
                backdrop={true}
                animationType='slide' >
                <View style={styles.modal}>
                    <TextInput
                        style={styles.input}
                        placeholder='Location Title'
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onChangeText={(text) => this.setState({ locationTitle: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Description'
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="done"
                        onChangeText={(text) => this.setState({ locationDescription: text })}
                    />
                    <IconButton
                        is_transparent={true}
                        icon='save'
                        style={styles.saveButton}
                        onPress={() => console.log('yoyoyoyo')} />
                    <IconButton
                        is_transparent={true}
                        icon='close'
                        style={styles.saveButton}
                        onPress={handleModalVisible} />
                    {/* <Button
                        style={{fontSize: 18, color: 'white'}}
                        containerStyle={styles.buttonContainer}
                        title={'Save'}
                    >
                        Save
                    </Button> */}
                </View>
            </Modal>
    )}
}

export default AddLocationMarkerModal

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        borderRadius: 30,
        shadowRadius: 10,
        width: 250,
        height: 250,
        margin: 100,
        backgroundColor: 'white'
        // position: 'absolute',
        // bottom: 0,
        // padding: 30,
        // width: 250,
        // height: 150,
        // borderRadius: 15
    },
    inputWrapper: {
        backgroundColor: 'white'
    },
    input: {
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 10,
    },
    buttonContainer: {
        padding: 8,
        marginLeft: 70,
        marginRight: 70,
        height: 40,
        borderRadius: 6,
        backgroundColor: 'green'
    },
    saveButton: {
        padding: 10
    },
})