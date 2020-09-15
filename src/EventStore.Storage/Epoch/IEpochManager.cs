﻿using System;
using EventStore.Core.TransactionLogV2.LogRecords;

namespace EventStore.Storage.Epoch {
	public interface IEpochManager {
		int LastEpochNumber { get; }

		void Init();

		EpochRecord GetLastEpoch();
		EpochRecord[] GetLastEpochs(int maxCount);
		EpochRecord GetEpoch(int epochNumber, bool throwIfNotFound);
		EpochRecord GetEpochWithAllEpochs(int epochNumber, bool throwIfNotFound);
		bool IsCorrectEpochAt(long epochPosition, int epochNumber, Guid epochId);

		void WriteNewEpoch(Action<EpochRecord> onEpochWritten);
		void SetLastEpoch(EpochRecord epoch);
	}
}