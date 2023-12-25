import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  Dimensions,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import PropTypes from 'prop-types';
import {globalStyles} from '../GlobalStyles';
import {ToastMessageComponent} from '../Utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerButtonComponent from '../components/DrawerButtonComponent';

const screenWidth = Dimensions.get('window').width;

const ReportBug = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleFilePick = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });

      setAttachments(results);
      console.log(results);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Document picking cancelled');
      } else {
        console.error('Error picking document:', error);
      }
    }
  };

  const handleCreateIssue = async () => {
    try {
      let attachmentUrls = [];

      if (attachments.length > 0) {
        for (const attachment of attachments) {
          const formData = new FormData();
          formData.append('file', {
            uri: attachment.uri,
            type: attachment.type,
            name: attachment.name,
          });

          const uploadResponse = await fetch(
            'https://gitlab.com/api/v4/projects/53394013/uploads',
            {
              method: 'POST',
              headers: {
                Authorization: 'Bearer glpat-vRz6SJ5xk8hrQRUdscEp',
              },
              body: formData,
            },
          );

          const uploadData = await uploadResponse.json();
          attachmentUrls.push(uploadData.url);
        }
      }

      const issueData = {
        title,
        description,
        labels: ['bug'],
        ...(attachmentUrls.length > 0 && {
          description: `${description}\n\n${attachmentUrls
            .map((url, index) => `![Attachment ${index + 1}](${url})`)
            .join('\n')}`,
        }),
      };

      const data = await fetch(
        'https://gitlab.com/api/v4/projects/53394013/issues',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer glpat-vRz6SJ5xk8hrQRUdscEp',
          },
          body: JSON.stringify(issueData),
        },
      );

      ToastMessageComponent(
        data.status === 201
          ? 'Raised Issue on Gitlab'
          : 'There was an error. Please try again',
      );
      setTitle('');
      setDescription('');
      setAttachments([]);
      console.log('Done');
    } catch (error) {
      console.error('Error creating GitLab issue:', error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={globalStyles.topContainer}>
        {route.params === undefined ? (
          <DrawerButtonComponent navigation={navigation} />
        ) : (
          <Pressable onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              color={globalStyles.navButtonColor}
              size={50}
            />
          </Pressable>
        )}
        <Text>Report a Bug</Text>
      </View>

      <View style={globalStyles.container}>
        <Text style={[globalStyles.textColor, styles.text]}>Title:</Text>
        <TextInput
          value={title}
          placeholder={'Title'}
          placeholderTextColor="#363636"
          onChangeText={text => setTitle(text)}
          style={globalStyles.textInput}
        />

        <Text style={[globalStyles.textColor, styles.text]}>Description:</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={description}
          placeholder={'Title'}
          placeholderTextColor="#363636"
          onChangeText={text => setDescription(text)}
          style={[globalStyles.textInput,{textAlignVertical:'top'}]}
        />

        {attachments.map((attachment, index) => (
          <Text
            key={index}
            style={[
              styles.selectedFileText,
              styles.text,
              globalStyles.textColor,
            ]}>
            File {index + 1} selected: {attachment.name}
          </Text>
        ))}
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleFilePick}
            style={[
              globalStyles.button,
              styles.button,
              styles.selectFileButton,
            ]}>
            <Text style={[globalStyles.buttonText, styles.buttonText]}>
              Choose File
            </Text>
          </Pressable>

          <Pressable
            onPress={handleCreateIssue}
            style={[globalStyles.button, styles.button, styles.issueButton]}>
            <Text style={[globalStyles.buttonText, styles.buttonText]}>
              Create Issue
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

ReportBug.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ReportBug;

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    width: screenWidth * 0.45,
    alignSelf: 'center',
  },
  selectFileButton: {
    backgroundColor: 'blue',
  },
  issueButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 20,
  },
  selectedFileText: {
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});
