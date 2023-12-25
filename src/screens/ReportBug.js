import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import PropTypes from 'prop-types';
import {ToastMessageComponent, windowDimensions} from '../Utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerButtonComponent from '../components/DrawerButtonComponent';
import {useTheme} from '@react-navigation/native';
import { TOKEN } from '../../config/GitlabAPIConfig';

const ReportBug = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);

  const {colors} = useTheme();

  const handleFilePick = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });
      setAttachments(results);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Document picking cancelled');
      } else {
        console.log('Error picking document:', error);
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
            'https://gitlab.com/api/v4/projects/52095225/uploads',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${TOKEN}`,
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
        'https://gitlab.com/api/v4/projects/52095225/issues',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
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
    } catch (error) {
      console.log('Error creating GitLab issue:', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: windowDimensions.height * 0.015,
      }}>
      <View style={styles.headerContainer}>
        {route.params === undefined ? (
          <DrawerButtonComponent navigation={navigation} />
        ) : (
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              color={'#fff'}
              size={windowDimensions.height * 0.04}
            />
          </Pressable>
        )}
        <Text
          style={{
            color: colors.text,
            textAlign: 'center',
            width: '80%',
            fontWeight: 'bold',
            fontSize: windowDimensions.height * 0.03,
          }}>
          Report a Bug
        </Text>
      </View>

      <View>
        <Text style={[styles.text, {color: colors.text}]}>Title:</Text>
        <TextInput
          value={title}
          placeholder={'Issue'}
          placeholderTextColor="#363636"
          onChangeText={text => setTitle(text)}
          style={[styles.textInput, {color:colors.text}]}
        />

        <Text style={[styles.text, {color: colors.text}]}>Description:</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={description}
          placeholder={'Please elaborate on the issue...'}
          placeholderTextColor="#363636"
          onChangeText={text => setDescription(text)}
          style={[styles.textInput, {textAlignVertical: 'top',marginBottom:'1.25%', color:colors.text}]}
        />

        {attachments.map((attachment, index) => (
          <Text
            key={index}
            style={[
              styles.selectedFileText,
              {color: colors.text},
            ]}>
            File {index + 1} selected: {attachment.name}
          </Text>
        ))}
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleFilePick}
            style={[styles.button, styles.selectFileButton]}>
            <Text style={[styles.buttonText, {color: colors.buttonText}]}>
              Choose File(s)
            </Text>
          </Pressable>

          <Pressable
            onPress={handleCreateIssue}
            style={[styles.button, styles.issueButton]}>
            <Text style={[styles.buttonText, {color: colors.buttonText}]}>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '1%',
    marginBottom: '2.5%',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowDimensions.width * 0.025,
    padding: windowDimensions.width * 0.02,
    marginVertical: '5%',
    width: windowDimensions.width * 0.4,
    alignSelf: 'center',
  },
  selectFileButton: {
    backgroundColor: '#468B97',
  },
  issueButton: {
    backgroundColor: '#D80032',
  },
  buttonText: {
    fontSize:  windowDimensions.height * 0.025,
    fontWeight: 'bold',
  },
  selectedFileText: {
    alignSelf: 'center',
    fontSize: windowDimensions.height * 0.02,
    fontWeight: 'bold',
    marginVertical: '0.75%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: windowDimensions.height * 0.025 ,
    fontWeight: 'bold',
    marginVertical: '1.5%',
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#363636',
    padding: 10,
  },
});
