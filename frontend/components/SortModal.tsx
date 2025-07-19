import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

const SortModal = ({
  modalOpen,
  setModalOpen,
  selectedSort,
  setSortState,
  defaultSortState,
  activeSort,
}: any) => {
  return (
    <View className="absolute top-0 left-0">
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View className="bg-black/30 flex-1 justify-center items-center">
          <View className="bg-white rounded-xl p-4 gap-3 min-w-52">
            <View className="flex-row gap-2 justify-between items-center">
              <Text>{selectedSort?.title}</Text>
              <TouchableOpacity
                onPress={() => setModalOpen(false)}
                className="bg-red-600 p-1.5 rounded-full"
              >
                <FontAwesomeIcon icon={faClose} size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View className="self-stretch">
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setSortState(defaultSortState);
                    selectedSort?.firstOption.onpress();
                    setModalOpen(false);
                  }}
                  className="flex-row items-center gap-2 border-t-[1px] border-black/30 pt-2 mb-2"
                >
                  <View
                    className={`items-center justify-center p-1.5 rounded-full border border-black/30 ${
                      selectedSort?.name === activeSort?.key &&
                      activeSort?.value === "desc"
                        ? "bg-green-500"
                        : "bg-white"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                  </View>
                  <Text>{selectedSort?.firstOption.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSortState(defaultSortState);
                    selectedSort?.secondOption.onpress();
                    setModalOpen(false);
                  }}
                  className="flex-row items-center gap-2 border-y-[1px] border-black/30 py-2"
                >
                  <View
                    className={`items-center justify-center p-1.5 rounded-full border border-black/30 ${
                      selectedSort?.name === activeSort?.key &&
                      activeSort?.value === "asc"
                        ? "bg-green-500"
                        : "bg-white"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                  </View>
                  <Text>{selectedSort?.secondOption.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSortState(defaultSortState);
                    selectedSort?.thirdOption.onpress();
                    setModalOpen(false);
                  }}
                  className="flex-row items-center gap-2 border-b-[1px] border-black/30 mt-2 pb-2"
                >
                  <View
                    className={`items-center justify-center p-1.5 rounded-full border border-black/30 ${
                      selectedSort?.name !== activeSort?.key ||
                      (activeSort?.value !== "desc" &&
                        activeSort?.value !== "asc")
                        ? "bg-green-500"
                        : "bg-white"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                  </View>
                  <Text>{selectedSort?.thirdOption.title}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SortModal;
