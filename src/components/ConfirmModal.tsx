import {View, Text, Modal, Pressable} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';

interface Props {
  children: JSX.Element;
  leftText: string;
  rightText: string;
  toggleModal: any;
  modalOnOff: boolean;
  confirmAction: () => void;
}
const ConfirmModal = ({
  children,
  leftText,
  rightText,
  toggleModal,
  modalOnOff,
  confirmAction,
}: Props) => {
  return (
    <Modal visible={modalOnOff} transparent>
      <View
        style={tw`flex-1 items-center justify-center bg-black bg-opacity-75`}>
        <View style={tw`w-73 rounded-2xl bg-white`}>
          <View style={tw`mt-10 mb-4 items-center`}>
            <View style={tw`text-sm font-bold`}>{children}</View>
          </View>

          <View style={tw`flex-row justify-center`}>
            <Pressable
              onPress={toggleModal}
              style={tw`mb-4 mr-2  items-center mt-2`}>
              <View
                style={tw`h-11 w-30 rounded-4 border-2 border-green-800  items-center justify-center rounded-lg`}>
                <Text style={tw`font-bold text-base text-gray-800`}>
                  {leftText}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={confirmAction}
              style={tw`mb-4  ml-2 items-center mt-2`}>
              <View
                style={tw`h-11 w-30 rounded-4 bg-green-800  items-center justify-center rounded-lg`}>
                <Text style={tw`font-bold text-base text-white`}>
                  {rightText}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
